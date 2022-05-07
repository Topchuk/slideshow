import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() stopVideo!: Subject<void>;
  @Input() resumeVideo!: Subject<void>;

  @ViewChild('video', { read: ElementRef }) video: ElementRef | undefined;

  private unsubscribe$$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.stopVideo.pipe(takeUntil(this.unsubscribe$$)).subscribe(() => {
      this.video?.nativeElement.pause();
    });

    this.resumeVideo.pipe(takeUntil(this.unsubscribe$$)).subscribe(() => {
      this.video?.nativeElement.play();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
  }
}
