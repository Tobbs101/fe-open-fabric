import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/url';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: Array<Product> = [];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Array<Product>>(`${baseUrl}/api/v1.0/product/all`).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log('Error fetching products:', error);
        if(error.status === 401){
          this.router.navigate(['/'])
        }
      }
    );
  }
}
