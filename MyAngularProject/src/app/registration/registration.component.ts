import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private route: Router, private formBuilder: FormBuilder) {
    this.user.name = { firstName: '', lastName: '' };
    this.user.password = { pwd: '', confirmPwd: '' };
  }

  ngOnInit(): void {
  }
  user: User = new User();
  passwordHide = true;
  confirmPasswordHide = true;

  registrationForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    password: new FormControl('', [Validators.pattern('(?=.*[A-z])(?=.*[0-9]).{8,}')]),
    confirmPassword: new FormControl('', []),
    id: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('',),
    gender: new FormControl('',)
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  })

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  getEmailErrorMessage() {
    if (this.registrationForm.controls['email'].hasError('required')) {
      return 'Email is required';
    }

    return this.registrationForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    return 'Not a valid phone number';
  }

  getPasswordErrorMessage() {
    return 'Password must have 8 digits, include letters and numbers';
  }

  onSubmit() {
    this.route.navigate(['../Welcome/' + this.user.name.firstName + " " + this.user.name.lastName])
  }
}
