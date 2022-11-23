import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { config } from '../../shared/configs/config';
import { Apartment } from '../models/apartment.model';

@Injectable({ providedIn: 'root' })
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getApartment(): Observable<Apartment> {
    return this.http
      .get<{ apartment: Apartment }>(config.loadUrl)
      .pipe(
        tap(apartment => console.log(apartment)),
        catchError(this.handleError('getApartment', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getIdGeocodes(apartment: Apartment) {
    return apartment.records.map(record => {
      return {
        id: record.propertyID,
        latitude: Number(record.geocode.Latitude),
        longitude: Number(record.geocode.Longitude)
      };
    });
  }
}
