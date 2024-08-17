import { AfterViewInit, Component , ElementRef, Input, ViewChild } from '@angular/core';
import { PersonalService } from './personal.service';
import { AbstractControl, NgForm, NgModel, Validators } from '@angular/forms';
import { Personal } from './personal';
import { ServiceService } from '../sharedService/service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { Width } from 'src/app/Model/width';
import { ImageService } from 'src/app/Service/image.service';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent  {

    constructor(private service : PersonalService,private Sservice:ServiceService, private http : HttpClient , private activatedRoute : ActivatedRoute
                , private authService : AuthService , private imageService : ImageService , private confirmService : NgConfirmService , 
                  private toastr : ToastrService , private router : Router){}

    @ViewChild('personalform') personalForm!: NgForm;

   // personalForm!: NgForm;

    state : any = [];
    district : any = [];

    width : any;

    personalData !: Personal;

    submitBtn : boolean = true;

    editBtn : boolean = false;

    profilePicture : any;

    ngOnInit(){
        this.state = this.service.state();
        this.personalData = this.activatedRoute.snapshot.data['personalData'];
        this.setDefaultValue();
        if(this.personalData!=null){
            this.submitBtn = false;
            this.editBtn = true;
        }

        this.getWidth();

        this.loadImage(this.authService.getCurrentLoggedUser());
    }

    getWidth(){
      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : (data)=>{
            this.width = data;
            console.log(data);
        },
        error : (error)=>{
          if(error.error.message==='Token Expired !!!'){
            this.toastr.warning('Token Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
            this.router.navigate(['/login']);
          }
        }
      });
    }

    // onSelectStateDist(stateId : any){
    //   this.district = this.service.district().filter(e => e.sid == stateId.target.value);
    // }

    drivingHidden : String = "hidden";

    drivinglicenseYes(DLnumber : string,DLname : string,DLplace : string,personalform : NgForm) : void {
        this.drivingHidden = "inline";
  
        if(this.personalData==null){
          personalform.controls[DLnumber].setValue('');
          personalform.controls[DLname].setValue('');
          personalform.controls[DLplace].setValue('');
        }
    }

    drivinglicenseNo(DLnumber : string,DLname : string,DLplace : string,personalform : NgForm) : void {
      this.drivingHidden = "hidden";

      personalform.controls[DLnumber].setValue(' ');
      personalform.controls[DLname].setValue(' ');
      personalform.controls[DLplace].setValue(' ');
    }

    pancardHidden : String = "hidden";

    panCardYes(PCnumber : string,PCname : string,PCplace : string,personalform : NgForm) : void {
      this.pancardHidden = "inline";

      if(this.personalData==null){
        personalform.controls[PCnumber].setValue('');
        personalform.controls[PCname].setValue('');
        personalform.controls[PCplace].setValue('');
      }
    }

    panCardNo(PCnumber : string,PCname : string,PCplace : string,personalform : NgForm) : void {
      this.pancardHidden = "hidden";

      personalform.controls[PCnumber].setValue(' ');
      personalform.controls[PCname].setValue(' ');
      personalform.controls[PCplace].setValue(' ');
    }

    votercardHidden : String = "hidden";

    voterCardYes(VCnumber : string,VCname : string,VCplace : string,personalform : NgForm) : void {
      this.votercardHidden = "inline";
      
      if(this.personalData==null){
        personalform.controls[VCnumber].setValue('');
        personalform.controls[VCname].setValue('');
        personalform.controls[VCplace].setValue('');
      }
    }

    voterCardNo(VCnumber : string,VCname : string,VCplace : string,personalform : NgForm) : void {
      this.votercardHidden = "hidden";
      
      personalform.controls[VCnumber].setValue(' ');
      personalform.controls[VCname].setValue(' ');
      personalform.controls[VCplace].setValue(' ');
    }

    passportHidden : String = "hidden";

    passportYes(Passnumber : string,Passname : string,Passplace : string,personalform : NgForm) : void {
      this.passportHidden = "inline";
      
      if(this.personalData==null){
        personalform.controls[Passnumber].setValue('');
        personalform.controls[Passname].setValue('');
        personalform.controls[Passplace].setValue('');
      }
    }

    passportNo(Passnumber : string,Passname : string,Passplace : string,personalform : NgForm) : void {
      this.passportHidden = "hidden";
      
      personalform.controls[Passnumber].setValue(' ');
      personalform.controls[Passname].setValue(' ');
      personalform.controls[Passplace].setValue(' ');
    }

    personal = new Personal();

    isButtonClicked : boolean = false;

    savePersonalData!: Observable<any>;

    personalMessage : string = "";

    personalWidth = new Width();

    storePersonalForm( personalform : NgForm ) : void {
        
      this.isButtonClicked = true;
      this.personal.userId = this.authService.getCurrentLoggedUser();

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      this.http.post('http://localhost:1010/savePersonal',this.personal,{headers}).subscribe(

        data=>{
            this.personalMessage = "Data Saved Successfully !!!";
            this.Sservice.setMessage(14);
        },
        error=>{
            this.personalMessage = "Data not saved . Please check !!!";
        }
        
      )

      this.personalWidth.userId = this.authService.getCurrentLoggedUser();
      this.personalWidth.width = 14;
      this.personalWidth.formname = 'Personal';
      
      this.http.post('http://localhost:1010/saveWidth',this.personalWidth,{headers}).subscribe(
        data=>{
          console.log("Width Saved");
        },
        error=>{
          console.log("Width Not Saved");
        }
      )

      personalform.reset();
    }


    updatePersonalForm(personalform : NgForm) : void {

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      this.personal.userId = this.authService.getCurrentLoggedUser();
      this.http.put('http://localhost:1010/updatePersonal',this.personal,{headers}).subscribe(

        data=>{
            this.personalMessage = "Data Updated Successfully !!!";
        },
        error=>{
            this.personalMessage = "Data not updated . Please check !!!";
        }
        
      )

      personalform.reset();
    }


    setDefaultValue(){

        if(this.personalData!=null){
          this.personal.title =  this.personalData.title;
          this.personal.firstname = this.personalData.firstname;
          this.personal.middlename = this.personalData.middlename;
          this.personal.lastname = this.personalData.lastname;
          this.personal.gender = this.personalData.gender;
          this.personal.dob = this.personalData.dob;
          this.personal.email = this.personalData.email;
          this.personal.relation = this.personalData.relation;
          this.personal.alteremail = this.personalData.alteremail;
          this.personal.mobile = this.personalData.mobile;
          this.personal.altermobile = this.personalData.altermobile;
          this.personal.relationpersonname = this.personalData.relationpersonname;
          this.personal.relationpersonmobile = this.personalData.relationpersonmobile;
          this.personal.nationality = this.personalData.nationality;
          this.personal.citizen = this.personalData.citizen;
          this.personal.religion = this.personalData.religion;
          this.personal.state = this.personalData.state;
          this.personal.district = this.personalData.district;
          this.personal.blood = this.personalData.blood;
          this.personal.reservation = this.personalData.reservation;
          this.personal.aadhar = this.personalData.aadhar;
          this.personal.marital = this.personalData.marital;
          this.personal.drivinglicense = this.personalData.drivinglicense;
          this.personal.drivinglicensenumber = this.personalData.drivinglicensenumber;
          this.personal.drivinglicensename = this.personalData.drivinglicensename;
          this.personal.drivinglicenseplace = this.personalData.drivinglicenseplace;
          this.personal.pancard = this.personalData.pancard;
          this.personal.pancardnumber = this.personalData.pancardnumber;
          this.personal.pancardname = this.personalData.pancardname;
          this.personal.pancardplace = this.personalData.pancardplace;
          this.personal.votercard = this.personalData.votercard;
          this.personal.votercardnumber = this.personalData.votercardnumber;
          this.personal.votercardname = this.personalData.votercardname;
          this.personal.votercardplace = this.personalData.votercardplace;
          this.personal.passport = this.personalData.passport;
          this.personal.passportnumber = this.personalData.passportnumber;
          this.personal.passportname = this.personalData.passportname;
          this.personal.passportplace = this.personalData.passportplace;
          this.personal.address1 = this.personalData.address1;
          this.personal.address2 = this.personalData.address2;
          this.personal.landmark = this.personalData.landmark;
          this.personal.country = this.personalData.country;
          this.personal.mailingstate = this.personalData.mailingstate;
          this.personal.mailingdistrict = this.personalData.mailingdistrict;
          this.personal.city = this.personalData.city;
          this.personal.postalcode = this.personalData.postalcode;
        }
        
    }

    canExist(){
      if((this.personal.title==null || this.personal.firstname==null || this.personal.middlename==null || this.personal.lastname==null || this.personal.gender==null 
        || this.personal.dob==null || this.personal.email==null || this.personal.relation==null || this.personal.mobile==null || this.personal.relationpersonname==null
        || this.personal.relationpersonmobile==null || this.personal.nationality==null || this.personal.citizen==null || this.personal.religion==null 
        || this.personal.state==null || this.personal.district==null || this.personal.blood==null || this.personal.reservation==null || this.personal.aadhar==null 
        || this.personal.marital==null || this.personal.drivinglicense==null || this.personal.drivinglicensenumber==null || this.personal.drivinglicensename==null 
        || this.personal.drivinglicenseplace==null || this.personal.pancard==null || this.personal.pancardnumber==null || this.personal.pancardplace==null 
        || this.personal.pancardname==null || this.personal.votercard==null || this.personal.votercardnumber==null || this.personal.votercardname==null 
        || this.personal.votercardplace==null || this.personal.passport==null || this.personal.passportnumber==null || this.personal.passportname==null 
        || this.personal.votercardplace==null || this.personal.address1==null || this.personal.landmark==null || this.personal.country==null || this.personal.mailingstate==null 
        || this.personal.mailingdistrict==null || this.personal.city==null || this.personal.postalcode==null)
      )
      
      {
        return confirm('You have unsaved changes . Do you want to navigate away ?');
      }

      else{
        return true;
      }
    }

    resetPersonalForm( personalform : NgForm ) : void {
        personalform.reset();
        this.drivingHidden = "hidden";
        this.pancardHidden = "hidden";
        this.votercardHidden = "hidden";
        this.passportHidden = "hidden";
    }


    outline : String = "focus:outline-none";

    nameexpression = "^[a-zA-Z .]+$";

    selectedFile!: File;
    imageUrl : any = "assets/images/person.jpg";



    onFileSelected(event : any , profilePic : NgModel){
      this.selectedFile = event.target.files[0];
      if(this.selectedFile){
        this.validateFile(this.selectedFile,profilePic);
      }
    }

    onUpload(picture : HTMLInputElement){
        this.imageService.uploadImage(this.selectedFile).subscribe({
          next : ()=>{
            this.loadImage(this.authService.getCurrentLoggedUser());
            // picture.value = '';
          },
          error : (error)=>{
            console.log(error);
          }
        })
    }

    loadImage(id : String){
      this.imageService.getImage(id).subscribe({
          next : (imageBlob)=>{
            const reader = new FileReader();
            reader.addEventListener('load',()=>{
              this.imageUrl = reader.result;
            },false);

            if(imageBlob){
              reader.readAsDataURL(imageBlob);
            }
          },
          error : (error)=>{
            console.log(error);
          }
      });
    }

    allowedTypes = ['image/png', 'image/jpeg' , 'image/jpg'];
    maxSize = 5 * 1024 * 1024; // 5MB

    validateFile(file : File , profilePic : NgModel){
        const fileInputControl = profilePic.control;

        if (!this.allowedTypes.includes(file.type)) {
          fileInputControl.setErrors({ invalidFileType: true });
        } else if (file.size > this.maxSize) {
          fileInputControl.setErrors({ fileTooLarge: true });
        } else {
          fileInputControl.setErrors(null);
        }
    }

}
