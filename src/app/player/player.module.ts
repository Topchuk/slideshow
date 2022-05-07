import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent, VideoComponent } from './components';

@NgModule({
  declarations: [
    PlayerComponent,
    VideoComponent,
  ],
  exports: [
    PlayerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PlayerModule { }
