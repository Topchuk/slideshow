import { PlayerService } from './player.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { SCREEN_KEY } from '../configs/player.config';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpClient;

  beforeEach(() => {
    httpMock = MockService<HttpClient>(HttpClient, {
      get: jest.fn().mockReturnValue(of(null)),
    });
    service = new PlayerService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get media', (done) => {
    const expectedUrl = 'media';
    const mediaKey = 'media-key';
    const expectedParams = new HttpParams({
      fromObject: {
        mediaKey,
      },
    });
    service.getMedia(mediaKey).subscribe(() => {
      expect(httpMock.get).toHaveBeenCalledWith(expectedUrl, { params: expectedParams, responseType: 'blob' });
      done();
    });
  });
  it('should call get key url', (done) => {
    const expectedUrl = 'key';
    const screenKey = SCREEN_KEY;
    const expectedParams = new HttpParams({
      fromObject: {
        screenKey,
      },
    });

    service.getPlaylist().subscribe(() => {
      expect(httpMock.get).toHaveBeenCalledWith(expectedUrl, { params: expectedParams });
      done();
    });
  });
});
