import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  width : any;

  constructor() { }

  setMessage(data:any){
    this.width = data;
  }

  getMessage(){
    return this.width;
  }
}
