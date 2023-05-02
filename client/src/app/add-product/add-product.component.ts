import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../../url';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: FormGroup;

  constructor(private formBuilder:FormBuilder){
    this.newProduct = this.formBuilder.group({
      productName:['', Validators.required],
      productDescription:['', Validators.required],
      productPrice:['', Validators.required],
      productAvailable:['', Validators.required]
    })
  }

  

}
