import { SafeUrl } from '@angular/platform-browser';

export interface PlaylistResponse {
  playlists: PlaylistResponseItem[];
  screenKey: string;
  creativeLabel: string;
}

export interface PlaylistResponseItem {
  playlistItems: PlaylistItem[];
  playlistKey: number;
}

export interface PlaylistItem {
  creativeKey: string;
  duration: number;
}

export interface PlayerItem {
  duration: number;
  data: SafeUrl;
  isVideo: boolean;
}
