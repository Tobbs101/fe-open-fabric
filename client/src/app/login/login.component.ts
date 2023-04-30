import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

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

  constructor(private toastr:ToastrService,private router:Router,private formBuilder: FormBuilder) {
    this.toastr.toastrConfig.iconClasses = {
      error: 'fa fa-times-circle',
      info: 'fa fa-info-circle',
      success: 'fa fa-check-circle',
      warning: 'fa fa-exclamation-circle'
    };
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    return this.showPassword;
  }

  showSuccess() {
    this.toastr.success('Success!');
  }

  check(){
    console.log(this.loginForm);
    if(this.loginForm.invalid){
       this.checkForm = true;
    } else this.checkForm = false;
    setTimeout(() => {
      this.checkForm = false
    },2000)
  }

  navigateToSignUp() {
    this.router.navigate(['/register']);
  }
}
