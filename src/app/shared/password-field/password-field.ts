import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [ReactiveFormsModule, Icon, TranslocoModule],
  templateUrl: './password-field.html',
  styleUrls: ['./password-field.css'],
})
export class PasswordField {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() autocomplete = 'current-password';
}
