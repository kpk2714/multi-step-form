import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.css']
})
export class DocumentsUploadComponent {

  constructor(private Sservice : ServiceService,private route : Router){}

  width : any = this.Sservice.getMessage();

  ngOnInit(){
      
  }

  showDataPrivacy : any = "hidden";

  viewDataPrivacy() : void {
    if(this.showDataPrivacy === "inline-block"){
      this.showDataPrivacy = "hidden";
    }
    else{
      this.showDataPrivacy = "inline-block";
    }
  }

  clickToViewDataPrivacy() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/dataprivacy");
  }

  showProofOfAge : any = "hidden";

  viewProofOfAge() : void {
    if(this.showProofOfAge === "inline-block"){
      this.showProofOfAge = "hidden";
    }
    else{
      this.showProofOfAge = "inline-block";
    }
  }

  clickToViewProofOFAge() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showDrivingLicense : String = "hidden";

  viewDrivingLicense() : void {
    if(this.showDrivingLicense === "inline-block"){
      this.showDrivingLicense = "hidden";
    }
    else{
      this.showDrivingLicense = "inline-block";
    }
  }

  clickToViewDrivingLicense() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showPassport : String = "hidden";

  viewPassport() : void {
    if(this.showPassport === "inline-block"){
      this.showPassport = "hidden";
    }
    else{
      this.showPassport = "inline-block";
    }
  }

  clickToViewPassport() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showPanCard : String = "hidden";

  viewPanCard() : void {
    if(this.showPanCard === "inline-block"){
      this.showPanCard = "hidden";
    }
    else{
      this.showPanCard = "inline-block";
    }
  }

  clickToViewPanCard() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showAadharCard : String = "hidden";

  viewAadharCard() : void {
    if(this.showAadharCard === "inline-block"){
      this.showAadharCard = "hidden";
    }
    else{
      this.showAadharCard = "inline-block";
    }
  }

  clickToViewAadharCard() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showSSC : String = "hidden";

  viewSSC() : void {
    if(this.showSSC === "inline-block"){
      this.showSSC = "hidden";
    }
    else{
      this.showSSC = "inline-block";
    }
  }

  clickToViewSSC() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showHSC : String = "hidden";

  viewHSC() : void {
    if(this.showHSC === "inline-block"){
      this.showHSC = "hidden";
    }
    else{
      this.showHSC = "inline-block";
    }
  }

  clickToViewHSC() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showDegreeMarksheet : String = "hidden";

  viewDegreeMarksheet() : void {
    if(this.showDegreeMarksheet === "inline-block"){
      this.showDegreeMarksheet = "hidden";
    }
    else{
      this.showDegreeMarksheet = "inline-block";
    }
  }

  clickToViewDegreeMarksheet() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showProvisionalOrPassing : String = "hidden";

  viewProvisionalOrPassing() : void {
    if(this.showProvisionalOrPassing === "inline-block"){
      this.showProvisionalOrPassing = "hidden";
    }
    else{
      this.showProvisionalOrPassing = "inline-block";
    }
  }

  clickToViewProvisionalOrPassing() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showPostDegreeMarksheet : String = "hidden";

  viewPostDegreeMarksheet() : void {
    if(this.showPostDegreeMarksheet === "inline-block"){
      this.showPostDegreeMarksheet = "hidden";
    }
    else{
      this.showPostDegreeMarksheet = "inline-block";
    }
  }

  clickToViewPostDegreeMarksheet() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showPostDegreeProvisionalOrPassing : String = "hidden";

  viewPostDegreeProvisionalOrPassing() : void {
    if(this.showPostDegreeProvisionalOrPassing === "inline-block"){
      this.showPostDegreeProvisionalOrPassing = "hidden";
    }
    else{
      this.showPostDegreeProvisionalOrPassing = "inline-block";
    }
  }

  clickToViewPostDegreeProvisionalOrPassing() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showDiplomaMarksheet : String = "hidden";

  viewDiplomaMarksheet() : void {
    if(this.showDiplomaMarksheet === "inline-block"){
      this.showDiplomaMarksheet = "hidden";
    }
    else{
      this.showDiplomaMarksheet = "inline-block";
    }
  }

  clickToViewDiplomaMarksheet() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  showDiplomaProvisionalOrPassing : String = "hidden";

  viewDiplomaProvisionalOrPassing() : void {
    if(this.showDiplomaProvisionalOrPassing === "inline-block"){
      this.showDiplomaProvisionalOrPassing = "hidden";
    }
    else{
      this.showDiplomaProvisionalOrPassing = "inline-block";
    }
  }

  clickToViewDiplomaProvisionalOrPassing() : void {
    this.route.navigateByUrl("pages/candidate-register/documents-upload/proof-of-age");
  }

  storeDocumentUploadForm(documentsUploadForm : NgForm) : void {

  }
}
