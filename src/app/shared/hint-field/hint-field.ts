import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-hint-field',
  standalone: true,
  imports: [ReactiveFormsModule, Icon, TranslocoModule],
  templateUrl: './hint-field.html',
  styleUrls: ['./hint-field.css'],
})
export class HintField {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() labelKey!: string;
  @Input() hintKey!: string;
  @Input() type = 'text';
  @Input() autocomplete = 'off';
}