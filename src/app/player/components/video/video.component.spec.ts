import { VideoComponent } from './video.component';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('VideoComponent', () => {
  let component: VideoComponent;

  beforeEach(async () => {
  });

  beforeEach(() => {
    component = new VideoComponent();
    component.video = {
      nativeElement: {
        pause: jest.fn(),
        play: jest.fn(),
      },
    };
    component.stopVideo = new Subject<void>();
    component.resumeVideo = new Subject<void>();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call video pause', fakeAsync(() => {
    component.stopVideo.next();
    tick();

    expect(component.video?.nativeElement.pause).toHaveBeenCalled();
  }));

  it('should call video play', fakeAsync(() => {
    component.ngOnInit();
    component.resumeVideo.next();
    tick();

    expect(component.video?.nativeElement.play).toHaveBeenCalled();
  }));
});
