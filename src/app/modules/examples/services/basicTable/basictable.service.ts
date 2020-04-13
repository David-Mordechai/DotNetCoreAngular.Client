import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../../models/periodicElement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasictableService {

  private URL: string = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<PeriodicElement[]>(`${this.URL}basicTable`);
  }
}
