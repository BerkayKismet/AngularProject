import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, TranslocoModule],
  templateUrl: './password-field.html',
  styleUrls: ['./password-field.css'],
})
export class PasswordField {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() autocomplete = 'current-password';
  /** Giriş alanının görünüm sınıfı; varsayılan auth stili, kurumsal kayıtta `custom-input`. */
  @Input() inputClass = 'form-control form-control-auth';
}
