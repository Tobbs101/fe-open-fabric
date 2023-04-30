import { Component ,OnInit} from '@angular/core';
import { TodoService } from 'src/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: '.app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  todos: any[] = [];

  constructor(private todoService: TodoService,private router:Router) { }

  public name:String = 'Tobbs';
  public displayName:String = '';
  public siteUrl:String = window.location.href;
  public isDisabled:boolean = false;
  public hasError:boolean = false;
  public isSpecial:boolean = true;
  public messageClasses: {
    'text-success': boolean,
    'text-danger': boolean,
    'text-special': boolean
  } = {
    'text-success': !this.hasError,
    'text-danger': this.hasError,
    'text-special': this.isSpecial
  };

  ngOnInit() {
    this.todoService.getTodos().subscribe((data: Object) => {
      this.todos = Object.values(data);
      console.log('todos',this.todos);
    });
  }

  greetUser(){
    return 'Hello ' + this.name;
  }

  toggleError(){
    this.hasError = !this.hasError; // Toggle the value of hasError
    return this.hasError;
  }
  toggleSpecial(){
    this.isSpecial = !this.isSpecial; // Toggle the value of hasSpecial
    return this.isSpecial;
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
