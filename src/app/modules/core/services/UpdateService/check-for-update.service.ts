import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  constructor(private updates: SwUpdate) { }

  registerService() {
    if (environment.production){
      const everyFiveMinutes$ = interval(5 * 60 * 1000);

      everyFiveMinutes$.subscribe(() => this.updates.checkForUpdate());

      this.updates.available.subscribe(event => {
        if (window.confirm("עוברים לגרסה חדשה!")) {
          this.updates.activateUpdate().then(() => document.location.reload());
        }
      });
    }
  }
}