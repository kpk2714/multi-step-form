import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Width } from 'src/app/Model/width';
import { PdfService } from 'src/app/Service/pdf.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.css']
})
export class DocumentsUploadComponent {

  constructor(private Sservice : ServiceService,private route : Router , private http : HttpClient , 
              private authService : AuthService , private pdfService : PdfService , private router : Router , 
              private toastr : ToastrService){}

  width : any;

  ngOnInit(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : (data)=>{
          this.width = data;
        },
        error : (error)=>{
          if(error.error.message==='Token Expired !!!'){
            this.toastr.warning('Token Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
            this.router.navigate(['/login']);
          }
        }
    });

    this.getProofOfAge();
    this.getDrivingLicense();
    this.getPassport();
    this.getAadharcard();
    this.getPancard();
    this.getSSC();
    this.getHSC();
    this.getDegree();
    this.getProvisional();
    this.getPostDegree();
    this.getPostProvisional();
    this.getDiploma();
    this.getDiplomaprovisional();
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

    this.Sservice.setMessage(16);
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

  isBtnClicked : boolean = false;

  selectedFile!: File;

  fileUrl!: String;

  onFileSelected(event : any , document : NgModel){
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
      this.validateFile(this.selectedFile,document);
    }
  }


  allowedTypes = ['application/pdf'];
    maxSize = 15 * 1024 * 1024; // 5MB

    validateFile(file : File , document : NgModel){
        const fileInputControl = document.control;

        if (!this.allowedTypes.includes(file.type)) {
          fileInputControl.setErrors({ invalidFileType: true });
        } else if (file.size > this.maxSize) {
          fileInputControl.setErrors({ fileTooLarge: true });
        } else {
          fileInputControl.setErrors(null);
        }
    }

  onUploadProofOfAge(proofOfAge : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'ProofOfAge','Pending').subscribe({
      next : ()=>{
        this.getProofOfAge();
        proofOfAge.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewProofOfAge(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','ProofOfAge').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadDrivingLicense(drivingLicense : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'DrivingLicense','Pending').subscribe({
      next : ()=>{
        this.getDrivingLicense();
        drivingLicense.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewDrivingLicense(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','DrivingLicense').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadPassport(passport : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Passport','Pending').subscribe({
      next : ()=>{
        this.getPassport();
        passport.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewPassport(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Passport').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadPancard(pancard : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Pancard','Pending').subscribe({
      next : ()=>{
        this.getPancard();
        pancard.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewPancard(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Pancard').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadAadharcard(aadharcard : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Aadharcard','Pending').subscribe({
      next : ()=>{
        this.getAadharcard();
        aadharcard.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewAadharcard(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Aadharcard').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onUploadSSC(SSC : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'SSC','Pending').subscribe({
      next : ()=>{
        this.getSSC();
        SSC.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewSSC(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','SSC').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadHSC(HSC : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'HSC','Pending').subscribe({
      next : ()=>{
        this.getHSC();
        HSC.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewHSC(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','HSC').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadDegree(Degree : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Degree','Pending').subscribe({
      next : ()=>{
        this.getDegree();
        Degree.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewDegree(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Degree').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadProvisional(provisional : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Provisional','Pending').subscribe({
      next : ()=>{
        this.getProvisional();
        provisional.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewProvisional(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Provisional').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadPostDegree(postdegree : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'PostDegree','Pending').subscribe({
      next : ()=>{
        this.getPostDegree();
        postdegree.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewPostDegree(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','PostDegree').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadPostProvisional(postprovisional : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'PostProvisional','Pending').subscribe({
      next : ()=>{
        this.getPostProvisional();
        postprovisional.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewPostProvisional(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','PostProvisional').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadDiploma(diploma : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'Diploma','Pending').subscribe({
      next : ()=>{
        this.getDiploma();
        diploma.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewDiploma(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','Diploma').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  onUploadDiplomaprovisional(diplomaprovisional : HTMLInputElement){
    this.pdfService.upload('http://localhost:1010/savePdf',this.selectedFile,'DiplomaProvisional','Pending').subscribe({
      next : ()=>{
        this.getDiplomaprovisional();
        diplomaprovisional.value = '';
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  onViewDiplomaprovisional(){
    this.pdfService.getPdf('http://localhost:1010/getPdf','DiplomaProvisional').subscribe({
      next : (data)=>{
        const url = window.URL.createObjectURL(data);
        this.fileUrl = url;
        window.open(url);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }





  proofOfAgePdf : any;

  getProofOfAge(){
    const tokenId = this.authService.getToken();
    const ageParameter = new HttpParams().set('documentName' , 'ProofOfAge').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : ageParameter ,headers : headers }).subscribe({
      next : (data : any)=>{
        this.proofOfAgePdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  drivingLicensePdf : any;

  getDrivingLicense(){
    const tokenId = this.authService.getToken();
    const drivingParameter = new HttpParams().set('documentName' , 'DrivingLicense').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : drivingParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.drivingLicensePdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  passportPdf : any;

  getPassport(){
    const tokenId = this.authService.getToken();
    const passportParameter = new HttpParams().set('documentName' , 'Passport').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : passportParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.passportPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  pancardPdf : any;

  getPancard(){
    const tokenId = this.authService.getToken();
    const pancardParameter = new HttpParams().set('documentName' , 'Pancard').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : pancardParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.pancardPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  aadharcardPdf : any;

  getAadharcard(){
    const tokenId = this.authService.getToken();
    const aadharcardParameter = new HttpParams().set('documentName' , 'Aadharcard').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : aadharcardParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.aadharcardPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  sscPdf : any;

  getSSC(){
    const tokenId = this.authService.getToken();
    const sscParameter = new HttpParams().set('documentName' , 'SSC').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : sscParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.sscPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  hscPdf : any;

  getHSC(){
    const tokenId = this.authService.getToken();
    const hscParameter = new HttpParams().set('documentName' , 'HSC').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : hscParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.hscPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  degreePdf : any;

  getDegree(){
    const tokenId = this.authService.getToken();
    const degreeParameter = new HttpParams().set('documentName' , 'Degree').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : degreeParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.degreePdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  provisionalPdf : any;

  getProvisional(){
    const tokenId = this.authService.getToken();
    const provisionalParameter = new HttpParams().set('documentName' , 'Provisional').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : provisionalParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.provisionalPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  postdegreePdf : any;

  getPostDegree(){
    const tokenId = this.authService.getToken();
    const postdegreeParameter = new HttpParams().set('documentName' , 'PostDegree').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : postdegreeParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.postdegreePdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  postprovisionalPdf : any;

  getPostProvisional(){
    const tokenId = this.authService.getToken();
    const postprovisionalParameter = new HttpParams().set('documentName' , 'PostProvisional').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : postprovisionalParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.postprovisionalPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  diplomaPdf : any;

  getDiploma(){
    const tokenId = this.authService.getToken();
    const diplomaParameter = new HttpParams().set('documentName' , 'Diploma').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : diplomaParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.diplomaPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  diplomaprovisionalPdf : any;

  getDiplomaprovisional(){
    const tokenId = this.authService.getToken();
    const diplomaprovisionalParameter = new HttpParams().set('documentName' , 'DiplomaProvisional').set('userId',this.authService.getCurrentLoggedUser().toString());
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPdfByDocumentName',{params : diplomaprovisionalParameter , headers : headers}).subscribe({
      next : (data : any)=>{
        this.diplomaprovisionalPdf = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


  newWidth : any = new Width();

  successMessage : string = "";
  errorMessage : string = "";

  dummyValue : any;

  storeDocumentUploadForm(documentsUploadForm : NgForm) : void {

    this.newWidth.userId = this.authService.getCurrentLoggedUser();
    this.newWidth.width = 16 + this.width;
    this.newWidth.formname = 'Documents';

    const tokenId = this.authService.getToken();
    const params = new HttpParams().set('tokenId',tokenId.toString());

    this.http.post('http://localhost:1010/saveWidth',this.newWidth,{params}).subscribe({
        next : ()=>{
          this.successMessage = "Documents Uploadded";
      },
      error : (error)=>{
        console.log(error);
        this.errorMessage = "Documents Not Uploaded , please check !!!";
      }
    });

    documentsUploadForm.reset();
  }
}
