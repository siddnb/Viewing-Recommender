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
  private filterUrl = `https://imdb-api.com/API/AdvancedSearch/${this.apiKey}?`;

  filters = {
    title_type: '',
    genres: [] as string[],
    user_rating: '',
    moviemeter: '',
    release_date: ''
  };

  constructor(private http: HttpClient) { }

  private createUrl(): string{
    let query = '';

    for(const [key,value] of Object.entries(this.filters)){
      if(Array.isArray(value)){
        let multipleVals = '';
        for(let i=0; i<value.length; i++){
          multipleVals += `${value[i]},`;
        }
        if(multipleVals!==''){
          query+=`${key}=${multipleVals}&`;
        }
      }
      else if(value !== '' || value.length!=0){
        value.trim();
        //Replace spaces with '%20'
        value.replace(/\s+/g, '%20');
        query += `${key}=${value}&`;
      }
    }

    //Remove the extraneous '&' at the end of the query
    //TODO: Make this actually work
    if(query[-1]==='&'){
      query.slice(0, query.length - 1);
    }

    console.log(`this is the query: ${query}`)
    return query;
  }

  getResults(): Observable<Response>{
    //TODO: Implement error handling
    let query = this.createUrl();

    return this.http.get<Response>(`${this.filterUrl}${query}`).pipe(
      tap(_ => console.log('success')));
  }

}
