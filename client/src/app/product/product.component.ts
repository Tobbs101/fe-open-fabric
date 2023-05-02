import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public Product: Product = {id:0,productName:'',productDescription:'',productPrice:0};

  constructor(private router: Router){}

  viewProducts(){
    this.router.navigate(['/products']);
  }

  ngOnInit():void {
    const currentProductJson = sessionStorage.getItem('currentProduct');
    if(currentProductJson && currentProductJson !== null){
      const currentProduct = JSON.parse(currentProductJson);
      this.Product = currentProduct;
      console.log(this.Product);
    }
  }
}
