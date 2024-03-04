import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Language } from './language';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-languages-known',
  templateUrl: './languages-known.component.html',
  styleUrls: ['./languages-known.component.css']
})
export class LanguagesKnownComponent {

  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  showSaveCancelButton : String = "hidden";

  showLanguage : String = "hidden";

  showAllLanguages : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddLanguage() : void{
    this.showAllLanguages = "hidden";
    this.showButton = "hidden";
    this.showEditDetails = "inline-block";
    this.showLanguage = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  language = new Language();

  storeLanguageForm(languageform : NgForm) : void {

  }

  nameexpression = "^[a-zA-Z .]+$";

  resetLanguageForm(languageform : NgForm) : void {
    languageform.reset();
  }
}
