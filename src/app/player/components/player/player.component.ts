import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, map, Observable, Subject, takeUntil, timer } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { MINUTE } from '../../configs/player.config';
import { PlayerItem, PlaylistItem, PlaylistResponse, PlaylistResponseItem } from '../../models/player.models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: [ './player.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit {
  images: PlayerItem[] = [];
  selectedIndex = 0;
  transform: number = 100;
  time = 0;
  // @ts-ignore
  player: Observable<number>;
  // @ts-ignore
  timer: Observable<number>;
  pauseVideo$$: Subject<void> = new Subject<void>();
  resumeVideo$$: Subject<void> = new Subject<void>();

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly playerService: PlayerService,
    private readonly domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.playerService.getPlaylist().pipe(take(1)).subscribe((data: PlaylistResponse) => {
      const list: PlaylistItem[] = [];

      data.playlists.forEach((playlist: PlaylistResponseItem) => {
        list.push(...playlist.playlistItems);
      });

      this.loadListItemsData(list)
    });
  }

  select(x: number) {
    this.downSelected(x);
    this.selectedIndex = x;
    this.time = 0;
  }

  downSelected(i: number) {
    this.transform = 100 - ( i ) * 50;
    this.selectedIndex = this.selectedIndex + 1;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  onPlay(): void {
    this.resumeVideo$$.next();
    this.unsubscribe.next();

    this.player = timer(this.images[ this.selectedIndex ].duration * MINUTE - this.time * MINUTE);
    this.timer = interval(MINUTE).pipe(
      map(() => {
        this.time += 1;
        return this.time;
      }),
      takeUntil(this.unsubscribe),
    );
    this.player.pipe(
      takeUntil(this.unsubscribe),
      map(() => {
        this.selectedIndex++;
        if (this.selectedIndex >= this.images.length) {
          this.selectedIndex = 0;
        }
        return this.selectedIndex;
      }),
    ).subscribe((i: number) => {
      this.select(i);
      this.time = 0;
      this.onPlay();
    });
  }

  onStop(): void {
    this.pauseVideo$$.next();

    this.unsubscribe.next();
  }

  private loadListItemsData(list: PlaylistItem[]): void {
    list.forEach((item: PlaylistItem) => {
      this.playerService.getMedia(item.creativeKey).pipe(take(1)).subscribe((blobImage: Blob) => {
        const objectURL = URL.createObjectURL(blobImage);
        const data = this.domSanitizer.bypassSecurityTrustUrl(objectURL);

        this.images.push({ data, isVideo: item.creativeKey.includes('mp4'), duration: item.duration });
      });
    });
  }
}
