import { Injectable, Inject } from '@angular/core';
import { Leader } from '../model/data';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { handleError } from 'src/app/services/utils';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(@Inject('BaseURL') private BaseURL, private httpClient: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return this.httpClient.get<Leader[]>(this.BaseURL + 'leaders')
      .pipe(catchError(handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.httpClient.get<Leader>(this.BaseURL + 'leaders/' + id)
      .pipe(catchError(handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.httpClient.get<Leader>(this.BaseURL + 'leaders?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(handleError));
  }

}
