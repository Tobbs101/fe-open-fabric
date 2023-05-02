import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<any>();

  setData(data:any){
    this.dataSubject.next(data);
  }

  getData(){
    return this.dataSubject.asObservable();
  }
  constructor() { }
}
