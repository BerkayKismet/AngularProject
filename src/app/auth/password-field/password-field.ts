import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [ReactiveFormsModule, Icon, TranslateModule],
  templateUrl: './password-field.html',
  styleUrls: ['./password-field.css'],
})
export class PasswordField {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() autocomplete = 'current-password';
}
