import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Work } from './work';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {


  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  showSaveCancelButton : String = "hidden";

  showCompany : String = "hidden";

  showWorkExperience : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddWork() : void{
    this.showWorkExperience = "hidden";
    this.showButton = "hidden";
    this.showEditDetails = "inline-block";
    this.showCompany = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  work = new Work();

  storeWorkExperienceForm(workexperienceform : NgForm) : void {

  }

  nameexpression = "^[a-zA-Z .]+$";

  resetWorkExperienceForm(workexperienceform : NgForm) : void {
    workexperienceform.reset();
  }
}
