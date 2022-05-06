import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {
  @Input() data: any;
  @Input() stopVideo!: Subject<void>;
  @Input() resumeVideo!: Subject<void>;

  @ViewChild('video', { read: ElementRef }) video: ElementRef | undefined;

  ngOnInit(): void {
    this.stopVideo.subscribe(() => {
      this.video?.nativeElement.pause();
    });

    this.resumeVideo.subscribe(() => {
      this.video?.nativeElement.play();
    });
  }
}
