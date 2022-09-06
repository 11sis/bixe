import { Component, Input } from '@angular/core';

@Component({
  selector: 'bixe-states-slider',
  templateUrl: './states-slider.component.html',
  styleUrls: ['./states-slider.component.scss'],
})
export class StatesSliderComponent {
  @Input() state: any;
  @Input() rootState: any;
}
