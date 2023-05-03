import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../url';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  newProduct: FormGroup;

  public checkForm: boolean = false;
  public checkProduct: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.newProduct = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productAvailable: ['', Validators.required],
    });
  }

  viewProducts(){
    this.router.navigate(['/products']);
  }

  submitForm() {
    const formData = this.newProduct.value;
    if (this.newProduct.invalid) {
      window.alert('Some fields are missing or invalid');
    } else {
      const token = sessionStorage.getItem('token');
      this.http
        .post(`${baseUrl}/api/v1.0/product`,formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .subscribe(
          (response) => {
            window.alert('Product added successfully');
            setTimeout(() => {this.router.navigate(['/products']);
            },1000);
            this.checkProduct = true;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
