import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthInput } from '../../shared/auth-input/auth-input';
import { PasswordField } from '../../shared/password-field/password-field';
import { RegisterConsents } from '../../shared/register-consents/register-consents';
import { GoogleSigninButton } from '../google-signin-button/google-signin-button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkWithHref,
    PasswordField,
    GoogleSigninButton,
    AuthInput,
    RegisterConsents,
    TranslocoModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  @Input() loginLink: string | unknown[] = '/login';
  @Input() skipLocationChange = false;

  /** Kurumsal kayıt sayfasına gider ve açık auth modalını kapatır. */
  readonly corporateRegisterCommands: unknown[] = [
    '/',
    { outlets: { primary: ['corporate-register'], modal: null } },
  ];

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    termsAccepted: [false, [Validators.requiredTrue]],
    marketingAccepted: [false],
    surveyAccepted: [false],
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  onGoogleSignIn(): void {}
}
