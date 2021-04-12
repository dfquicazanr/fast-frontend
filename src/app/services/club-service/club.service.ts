import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '~environment/environment';
import {Club, clubCamelToSnake, clubSnakeToCamel} from '~models/club';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  clubsUri = `${environment.apiUri}/clubs`;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Club[]> {
    return this.httpClient.get<{list: {clubs: Club[]}}>(this.clubsUri)
      .pipe(
        map(rawData => rawData.list.clubs.map(snakeClub => clubSnakeToCamel(snakeClub)))
      );
  }

  post(club: Club): Observable<Club> {
    const snakeClub = clubCamelToSnake(club);
    return this.httpClient.post<Club>(this.clubsUri, snakeClub);
  }
}
