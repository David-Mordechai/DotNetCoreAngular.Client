import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicElement } from '../../models/periodicElement';

@Injectable({
  providedIn: 'root'
})
export class BasictableService {

  readonly BaseURI = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<PeriodicElement[]>(`${this.BaseURI}/basicTable`);
  }
}
