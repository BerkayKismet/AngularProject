import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
  | 'close'
  | 'menu'
  | 'search'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'twitter'
  | 'linkedin';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrls: ['./icon.css'],
})
export class Icon {
  @Input() name: IconName = 'close';
}
