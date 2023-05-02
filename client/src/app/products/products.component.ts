import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/url';
import { DataService } from '../data.service';

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
}

interface ProductResponse {
  product: Product[];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: Array<Product> = [];
  public userData: any;
  public isLoaded: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.dataService.getData().subscribe((data) => {
      this.userData = data;
    });
  }

  routeToAdd(){
    this.router.navigate(['/add-product']);
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    this.http
      .get<ProductResponse>(`${baseUrl}/api/v1.0/product/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe(
        (data) => {
          this.products = data.product;
          console.log('p', this.products);
          this.isLoaded = true;
        },
        (error) => {
          console.log('Error fetching products:', error);
          this.isLoaded = true;
          if (error.status === 401) {
            this.router.navigate(['/']);
          }
        }
      );
  }
}
