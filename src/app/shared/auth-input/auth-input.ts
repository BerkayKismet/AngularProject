import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-auth-input',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './auth-input.html',
  styleUrls: ['./auth-input.css'],
})
export class AuthInput {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() labelKey!: string;
  @Input() type = 'text';
  @Input() autocomplete = 'off';
  @Input() inputmode: string | null = null;
}