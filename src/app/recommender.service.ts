import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from './suggestion';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  apiKey = environment.apiKey;
  private filterUrl = `https://imdb-api.com/API/AdvancedSearch/${this.apiKey}?title=The%20godfather&genres=comedy`;

  constructor(private http: HttpClient) { }

  getResults(): Observable<Response>{
    return this.http.get<Response>(this.filterUrl).pipe(
      tap(_ => console.log('success')));
  }

}
