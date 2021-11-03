import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
    console.log("CheckForUpdateService constructor")
  }

  registerService() {
    console.log("CheckForUpdateService => registerService")
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everyFiveMinutes$ = interval(1 * 60 * 1000);
    const everyFiveMinutesOnceAppIsStable$ = concat(appIsStable$, everyFiveMinutes$);

    everyFiveMinutesOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());

    this.updates.available.subscribe(event => {
      if (window.confirm("עוברים לגרסה חדשה!")) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}