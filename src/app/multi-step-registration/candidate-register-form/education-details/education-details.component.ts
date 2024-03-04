import { Component } from '@angular/core';
import { Personal } from '../personal-details/personal';
import { Education } from './education';
import { NgForm } from '@angular/forms';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { ServiceService } from '../sharedService/service.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent {

  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
    //this.Sservice.setMessage(this.width+12);
  }

  showEducation : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddEducation() : void{
      this.showEducation = "hidden";
      this.showButton = "hidden";
      this.showEditDetails = "inline";
  }

  personal = new Personal();

  education = new Education();

  showSecondary : String = "hidden";

  secondaryYes() : void{
    this.showSecondary = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  secondaryNo() : void{
    this.showSecondary = "hidden";
  }

  showHigherSecondary : String = "hidden";

  highersecondaryYes() : void{
    this.showHigherSecondary = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  highersecondaryNo() : void{
    this.showHigherSecondary = "hidden";
  }

  showDiploma : String = "hidden";

  DiplomaYes() : void{
    this.showDiploma = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  DiplomaNo() : void{
    this.showDiploma = "hidden";
  }

  showGraduation : String = "hidden";

  GraduationYes() : void{
    this.showGraduation = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  GraduationNo() : void {
    this.showGraduation = "hidden";
  }

  storeEducationForm( personalform : NgForm ) : void {
    // this.toastr.success("Data Saved Successfully","" , { timeOut : 1000});
    this.Sservice.setMessage(this.width+12);
  }

  resetEducationForm( educationform : NgForm ) : void {
      educationform.reset();
      this.showSecondary = "hidden";
      this.showHigherSecondary = "hidden";
      this.showDiploma = "hidden";
      this.showGraduation = "hidden";
  }

  showSaveCancelButton : String = "hidden";
}
