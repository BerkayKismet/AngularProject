import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './password-field.html',
  styleUrls: ['./password-field.css'],
})
export class PasswordField {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() autocomplete = 'current-password';
}
