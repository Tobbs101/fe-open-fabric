import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userData:any;

  constructor (private router:Router,private dataService:DataService){
    this.dataService.getData().subscribe((data) => {
      this.userData = data;
      console.log('data',data);
    });
  }

  navigateToLogin() {
    this.router.navigate(['/']);
    this.dataService.setData('');
  }
}
