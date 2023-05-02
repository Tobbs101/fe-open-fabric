import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userData: any;
  user: any;

  constructor(private router: Router, private dataService: DataService) {
    
  }
  
  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson && userJson !== null) {
      const user = JSON.parse(userJson);
      console.log(user);
     return this.userData = user;
    }
    this.dataService.getData().subscribe((data) => {
      console.log(data);
      this.userData = data;
    });
  }

  navigateToLogin() {
    this.router.navigate(['/']);
    this.dataService.setData('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
