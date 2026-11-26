import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { PasswordField } from '../../shared/password-field/password-field';
import { RegisterConsents } from '../../shared/register-consents/register-consents';

export type BusinessType = 'sole' | 'limited';

@Component({
  selector: 'app-corporate-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordField,
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
    businessType: this.fb.nonNullable.control<BusinessType>('sole', [
      Validators.required,
    ]),
    taxProvince: ['', [Validators.required]],
    taxOffice: [{ value: '', disabled: true }, [Validators.required]],
    taxId: ['', [Validators.required]],
    nationalId: ['', [Validators.required]],
    termsAccepted: [false, [Validators.requiredTrue]],
    marketingAccepted: [false],
    surveyAccepted: [false],
  });

  private readonly subscriptions = new Subscription();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const { businessType, province, district, taxProvince } = this.form.controls;

    this.subscriptions.add(
      businessType.valueChanges.subscribe((type) =>
        this.syncNationalIdForBusinessType(type)
      )
    );
    this.subscriptions.add(
      province.valueChanges.subscribe((value) =>
        this.syncDistrictForProvince(value)
      )
    );
    this.subscriptions.add(
      district.valueChanges.subscribe((value) =>
        this.syncNeighborhoodForDistrict(value)
      )
    );
    this.subscriptions.add(
      taxProvince.valueChanges.subscribe((value) =>
        this.syncTaxOfficeForTaxProvince(value)
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
    this.syncDependent(this.form.controls.district, province);
    this.syncDependent(this.form.controls.neighborhood, '');
  }

  private syncNeighborhoodForDistrict(district: string): void {
    this.syncDependent(this.form.controls.neighborhood, district);
  }

  private syncTaxOfficeForTaxProvince(taxProvince: string): void {
    this.syncDependent(this.form.controls.taxOffice, taxProvince);
  }

  /** Üst alan doluysa bağımlı alanı sıfırlayıp açar; boşsa sıfırlayıp kapatır. */
  private syncDependent(control: FormControl<string>, parentValue: string): void {
    control.reset('', { emitEvent: false });

    if (parentValue) {
      control.enable({ emitEvent: false });
    } else {
      control.disable({ emitEvent: false });
    }
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
