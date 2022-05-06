import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent {
  @Input() data: any;
}
