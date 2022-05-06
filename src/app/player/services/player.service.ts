import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { SCREEN_KEY } from '../configs/player.config';
import { PlaylistResponse } from '../models/player.models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  constructor(private readonly http: HttpClient) {
  }

  getPlaylist(): Observable<PlaylistResponse> {
    const params = new HttpParams({
      fromObject: {
        screenKey: SCREEN_KEY,
      },
    });
    const url = 'key';

    return this.http.get<PlaylistResponse>(url, { params }).pipe(
      catchError((err: Error) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }

  getMedia(key: string): Observable<Blob> {
    const params = new HttpParams({
      fromObject: {
        mediaKey: key,
      },
    });
    const url = 'media';

    return this.http.get(url, { params, responseType: 'blob' }).pipe(
      catchError((err: Error) => {
        console.error(err);
        return EMPTY;
      }),
    );
  }
}
