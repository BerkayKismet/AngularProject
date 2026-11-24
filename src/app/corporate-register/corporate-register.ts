import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { AuthInput } from '../shared/auth-input/auth-input';
import { AuthSelect } from '../shared/auth-select/auth-select';
import { HintField } from '../shared/hint-field/hint-field';
import { PasswordField } from '../shared/password-field/password-field';
import { RegisterConsents } from '../shared/register-consents/register-consents';

export type BusinessType = 'sole' | 'limited';

@Component({
  selector: 'app-corporate-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordField,
    AuthInput,
    AuthSelect,
    HintField,
    RegisterConsents,
    TranslocoModule,
  ],
  templateUrl: './corporate-register.html',
  styleUrls: ['./corporate-register.css'],
})
export class CorporateRegister implements OnInit, OnDestroy {
  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    mobilePhone: ['', [Validators.required]],
    landlinePhone: [''],
    authorizationCertificateNumber: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    province: ['', [Validators.required]],
    district: [{ value: '', disabled: true }, [Validators.required]],
    neighborhood: [{ value: '', disabled: true }, [Validators.required]],
    businessType: this.fb.nonNullable.control<BusinessType>('limited', [
      Validators.required,
    ]),
    taxProvince: ['', [Validators.required]],
    taxOffice: [{ value: '', disabled: true }, [Validators.required]],
    taxId: ['', [Validators.required]],
    nationalId: [{ value: '', disabled: true }],
    termsAccepted: [false, [Validators.requiredTrue]],
    marketingAccepted: [false],
    surveyAccepted: [false],
  });

  private readonly subscriptions = new Subscription();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.controls.businessType.valueChanges.subscribe((type) =>
        this.syncNationalIdForBusinessType(type)
      )
    );
    this.subscriptions.add(
      this.form.controls.province.valueChanges.subscribe((province) =>
        this.syncDistrictForProvince(province)
      )
    );
    this.subscriptions.add(
      this.form.controls.district.valueChanges.subscribe((district) =>
        this.syncNeighborhoodForDistrict(district)
      )
    );
    this.subscriptions.add(
      this.form.controls.taxProvince.valueChanges.subscribe((taxProvince) =>
        this.syncTaxOfficeForTaxProvince(taxProvince)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  private syncDistrictForProvince(province: string): void {
    const district = this.form.controls.district;

    if (!province) {
      this.disableAndReset(district);
      this.disableAndReset(this.form.controls.neighborhood);
      return;
    }

    district.reset('', { emitEvent: false });
    this.disableAndReset(this.form.controls.neighborhood);
    district.enable({ emitEvent: false });
  }

  private syncNeighborhoodForDistrict(district: string): void {
    const neighborhood = this.form.controls.neighborhood;

    if (!district) {
      this.disableAndReset(neighborhood);
      return;
    }

    neighborhood.reset('', { emitEvent: false });
    neighborhood.enable({ emitEvent: false });
  }

  private syncTaxOfficeForTaxProvince(taxProvince: string): void {
    const taxOffice = this.form.controls.taxOffice;

    if (!taxProvince) {
      this.disableAndReset(taxOffice);
      return;
    }

    taxOffice.reset('', { emitEvent: false });
    taxOffice.enable({ emitEvent: false });
  }

  private disableAndReset(control: FormControl<string>): void {
    control.reset('', { emitEvent: false });
    control.disable({ emitEvent: false });
  }

  private syncNationalIdForBusinessType(type: BusinessType): void {
    const nationalId = this.form.controls.nationalId;

    if (type === 'limited') {
      nationalId.reset('');
      nationalId.clearValidators();
      nationalId.updateValueAndValidity({ emitEvent: false });
      nationalId.disable({ emitEvent: false });
      return;
    }

    nationalId.enable({ emitEvent: false });
    nationalId.setValidators([Validators.required]);
    nationalId.updateValueAndValidity({ emitEvent: false });
  }
}
