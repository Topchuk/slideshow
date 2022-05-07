import { SafeUrl } from '@angular/platform-browser';

export interface PlaylistResponse {
  playlists: PlaylistResponseItem[];
  screenKey: string;
}

export interface PlaylistResponseItem {
  playlistItems: PlaylistItem[];
  playlistKey: string;
}

export interface PlaylistItem {
  creativeKey: string;
  duration: number;
  creativeLabel: string;
}

export interface PlayerItem {
  duration: number;
  data: SafeUrl;
  isVideo: boolean;
  creativeLabel: string;
}
