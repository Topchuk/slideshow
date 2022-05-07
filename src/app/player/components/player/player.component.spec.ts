import { PlayerComponent } from './player.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { PlayerService } from '../../services/player.service';
import { of } from 'rxjs';
import { PlaylistItem, PlaylistResponse, PlaylistResponseItem } from '../../models/player.models';
import { fakeAsync, tick } from '@angular/core/testing';

describe('PlayerComponent', () => {

  let component: PlayerComponent;
  let domSanitizerMock: DomSanitizer;
  let playerServiceMock: PlayerService;

  const playlistItemMock: PlaylistItem = {
    creativeKey: 'creative-key',
    creativeLabel: 'creative-label',
    duration: 10,
  };
  const playlistResponseItemMock: PlaylistResponseItem = {
    playlistItems: [ playlistItemMock ],
    playlistKey: 'playlist-key',
  };

  const playlistResponseMock: PlaylistResponse = {
    playlists: [ playlistResponseItemMock ],
    screenKey: 'key',
  };


  beforeEach(() => {
    window.URL.createObjectURL = jest.fn();
    domSanitizerMock = MockService(DomSanitizer, {
      sanitize: jest.fn(),
    });
    playerServiceMock = MockService(PlayerService, {
      getPlaylist: jest.fn().mockReturnValue(of(playlistResponseMock)),
      getMedia: jest.fn().mockReturnValue(of(new Blob())),
    });
    component = new PlayerComponent(playerServiceMock, domSanitizerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should call getPlaylist', () => {
      component.ngOnInit();

      expect(playerServiceMock.getPlaylist).toHaveBeenCalledTimes(1);
    });

    it('should get media details for playlist item', fakeAsync(() => {
      component.ngOnInit();

      tick();
      expect(playerServiceMock.getMedia).toHaveBeenCalledWith(playlistItemMock.creativeKey);
    }));
  });
});
