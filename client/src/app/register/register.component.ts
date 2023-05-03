import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  public showPassword: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  register() {
    const formData = this.registerForm.value;
    if (this.registerForm.invalid) {
      window.alert('Some fields are missing or invalid...');
    } else {
      this.http.post(`${baseUrl}/api/v1.0/user/create`, formData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
          window.alert('Registration successful...');
        },
        (error) => {
          console.log(error);
          window.alert('Unable to register, please try again...');
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
