import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../../url';
import { DataService } from '../data.service';

interface LoginResponse {
  token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    const formData = this.loginForm.value;
    if (this.loginForm.invalid) {
      window.alert('Some fields are missing or invalid...');
    } else {
      this.http.post<LoginResponse>(`${baseUrl}/api/v1.0/user/login`, formData).subscribe(
        (response) => {
          this.dataService.setData(response);
          const Token = response.token;
          sessionStorage.setItem('token',Token);
          sessionStorage.setItem('user',JSON.stringify(response));
          this.router.navigate(['/products']);
          window.alert('Login successful');
        },
        (error) => {
          console.error(error);
          window.alert('Unable to login, please confirm credentials...')
        }
      );
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  navigateToSignUp() {
    this.router.navigate(['/register']);
  }
}
