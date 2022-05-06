import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent, VideoComponent, ImageComponent } from './components';

@NgModule({
  declarations: [
    PlayerComponent,
    VideoComponent,
    ImageComponent,
  ],
  exports: [
    PlayerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PlayerModule { }
