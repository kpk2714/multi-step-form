import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Skill } from './skill';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent {

  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  showSaveCancelButton : String = "hidden";

  showCertification : String = "hidden";

  showTechnicalSkill : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddSkill() : void{
    this.showTechnicalSkill = "hidden";
    this.showButton = "hidden";
    this.showEditDetails = "inline-block";
    this.showCertification = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  skill = new Skill();

  storeTechnicalSkillForm(technicalskillform : NgForm) : void {

  }

  nameexpression = "^[a-zA-Z .]+$";

  resetTechnicalSkillForm(technicalskillform : NgForm) : void {
    technicalskillform.reset();
  }
}
