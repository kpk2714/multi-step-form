import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Family } from './family';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent {

  constructor(private Sservice : ServiceService){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  family = new Family();

  showSaveCancelButton : String = "hidden";

  showFather : String = "hidden";

  fatherYes() : void{
      this.showFather = "inline-block";
      this.showSaveCancelButton = "inline-block";
  }

  fatherNo() : void{
      this.showFather = "hidden";
  }

  showFamily : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddInformation() : void{
      this.showFamily = "hidden";
      this.showButton = "hidden";
      this.showEditDetails = "inline";
  }

  showMother : String = "hidden";

  motherYes() : void {
    this.showMother = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  motherNo() : void {
    this.showMother = "hidden";
  }

  showWifeHus : String = "hidden";

  WifeHusYes() : void {
     this.showWifeHus = "inline-block";
     this.showSaveCancelButton = "inline-block";
  }

  WifeHusNo() : void {
    this.showWifeHus = "hidden";
    this.family.WifeHusfirstname = "Do not have";
    this.family.WifeHusmiddlename = "Do not have";
    this.family.WifeHuslastname = "Do not have";
    this.family.WifeHusgender = "Do not have";
    this.family.WifeHusdobf = "Do not have";
    this.family.WifeHusnationality = "Do not have";
    this.family.WifeHusqualification = "Do not have";
  }

  showChild : String = "hidden";

  ChildYes() : void {
    this.showChild = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  ChildNo() : void {
    this.showChild = "hidden";
    this.family.Childfirstname = "Do not have";
    this.family.Childmiddlename = "Do not have";
    this.family.Childlastname = "Do not have";
    this.family.Childgender = "Do not have";
    this.family.Childdobf = "Do not have";
    this.family.Childnationality = "Do not have";
    this.family.Childqualification = "Do not have";
  }

  storeFamilyForm(familydetailsform : NgForm){

  }

  nameexpression = "^[a-zA-Z .]+$";

  resetFamilyDetailsForm(familydetailsform : NgForm){
      familydetailsform.reset();
      this.showFather = "hidden";
      this.showMother = "hidden";
      this.showWifeHus = "hidden";
      this.showChild = "hidden";
  }
}
