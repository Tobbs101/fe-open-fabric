import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../../url';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  public showPassword: boolean = false;
  public email: string = '';
  public password: string = '';
  public checkForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.toastr.toastrConfig.iconClasses = {
      error: 'fa fa-times-circle',
      info: 'fa fa-info-circle',
      success: 'fa fa-check-circle',
      warning: 'fa fa-exclamation-circle',
    };

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    const formData = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.checkForm = true;
    } else {
      this.checkForm = false;
      this.http.post(`${baseUrl}/api/v1.0/user/login`, formData).subscribe(
        (response) => {
          console.log(response);
          this.dataService.setData(response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error(error);
          this.toastr.error('Unable to login, please confirm credentials...')
        }
      );
    }
    setTimeout(() => {
      this.checkForm = false;
    }, 2000);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  navigateToSignUp() {
    this.router.navigate(['/register']);
  }
}
