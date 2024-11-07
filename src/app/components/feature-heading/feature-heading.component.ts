import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../resources/material.module';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-feature-heading',
  standalone: true,
  imports: [MaterialModule, MatTooltip],
  templateUrl: './feature-heading.component.html',
  styleUrl: './feature-heading.component.scss'
})
export class FeatureHeadingComponent {
  @Input() heading!: string;
  @Input() subheading!: string;
  @Input() about!: string;
}
