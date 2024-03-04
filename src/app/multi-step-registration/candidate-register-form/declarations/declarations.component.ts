import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Declarations } from './declarations';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.css']
})
export class DeclarationsComponent {

  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  declare = new Declarations();

  storeDeclarationForm(declarationForm : NgForm) : void {

  }
}
