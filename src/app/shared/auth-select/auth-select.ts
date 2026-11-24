import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-auth-select',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './auth-select.html',
  styleUrls: ['./auth-select.css'],
})
export class AuthSelect {
  @Input() control!: FormControl<string>;
  @Input() inputId!: string;
  @Input() labelKey!: string;
}