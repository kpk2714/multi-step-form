import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Child } from './child';
import { WifeHus } from './wife-hus';
import { Mother } from './mother';
import { Father } from './father';
import { Width } from 'src/app/Model/width';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent {

  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
    private router : Router , private toastr : ToastrService
  ){}

  width : any;

  fatherData : any = new Father();
  motherData : any = new Mother();
  wifeHusData : any = new WifeHus();
  childData : any = new Child();

  ngOnInit(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
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

    this.getFather(headers);

    this.getMother(headers);

    this.getWifeHus(headers);

    this.getChild(headers);
  }

  getFather(headers : any){
    this.http.get('http://localhost:1010/getFather/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
        next : (data : any)=>{
          this.fatherData = data;
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }

  getMother(headers : any){
    this.http.get('http://localhost:1010/getMother/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
      next : (data : any)=>{
        this.motherData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getWifeHus(headers : any){
    this.http.get('http://localhost:1010/getWifeHus/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
      next : (data : any)=>{
        this.wifeHusData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getChild(headers : any){
    this.http.get('http://localhost:1010/getChild/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
      next : (data : any)=>{
        this.childData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  showSaveCancelButton : String = "hidden";

  showFather : String = "hidden";

  fatherYes() : void{
      this.showFather = "inline-block";
      this.showSaveCancelButton = "inline-block";
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

  showWifeHus : String = "hidden";

  WifeHusYes() : void {
     this.showWifeHus = "inline-block";
     this.showSaveCancelButton = "inline-block";
  }

  WifeHusNo(familyForm : NgForm) : void {

    this.showWifeHus = "hidden";

    familyForm.controls['wifeHusrelationship']?.setValue(' ');
    familyForm.controls['WifeHusfirstname']?.setValue(' ');
    familyForm.controls['WifeHusmiddlename']?.setValue(' ');
    familyForm.controls['WifeHuslastname']?.setValue(' ');
    familyForm.controls['WifeHusgender']?.setValue(' ');
    familyForm.controls['WifeHusdobf']?.setValue(' ');
    familyForm.controls['WifeHusnationality']?.setValue(' ');
    familyForm.controls['WifeHusqualification']?.setValue(' ');
    familyForm.controls['WifeHusoccupation']?.setValue(' ');
    familyForm.controls['WifeHuscontactnumber']?.setValue(' ');

  }

  showChild : String = "hidden";

  ChildYes() : void {
    this.showChild = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  ChildNo(familydetailsform : NgForm) : void {
    this.showChild = "hidden";

    familydetailsform.controls['Childrelationship']?.setValue(' ');
    familydetailsform.controls['Childfirstname']?.setValue(' ');
    familydetailsform.controls['Childmiddlename']?.setValue(' ');
    familydetailsform.controls['Childlastname']?.setValue(' ');
    familydetailsform.controls['Childgender']?.setValue(' ');
    familydetailsform.controls['Childdobf']?.setValue(' ');
    familydetailsform.controls['Childnationality']?.setValue(' ');
    familydetailsform.controls['Childqualification']?.setValue(' ');
    familydetailsform.controls['Childoccupation']?.setValue(' ');
    familydetailsform.controls['Childcontactnumber']?.setValue(' ');
  }

  child = new Child();
  wifeHus = new WifeHus();
  mother = new Mother();
  father = new Father();

  successMessage : String = "";
  errorMessage : String = "";

  newWidth = new Width();

  storeFamilyForm(familydetailsform : NgForm){

    this.father.userId = this.authService.getCurrentLoggedUser();
    this.mother.userId = this.authService.getCurrentLoggedUser();
    this.wifeHus.userId = this.authService.getCurrentLoggedUser();
    this.child.userId = this.authService.getCurrentLoggedUser();

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.post('http://localhost:1010/saveFather',this.father,{headers}).subscribe({
      next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          this.errorMessage = "";
      },
      error : ()=>{
          this.errorMessage = "Data Not Saved , Please Check !!!";
          this.successMessage = "";
      }
    });

    this.http.post('http://localhost:1010/saveMother',this.mother,{headers}).subscribe({
      next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          this.errorMessage = "";
      },
      error : ()=>{
          this.errorMessage = "Data Not Saved , Please Check !!!";
          this.successMessage = "";
      }
    });

    if(this.fatherData==null && this.motherData==null && this.wifeHusData==null && this.childData==null){
      
      this.newWidth.userId = this.authService.getCurrentLoggedUser();
      this.newWidth.width = 14+this.width;
      this.newWidth.formname = 'Family';

      this.http.post('http://localhost:1010/saveWidth',this.newWidth,{headers}).subscribe({
        next : ()=>{

        },
        error : (error)=>{
          console.log(error);
        }
      });
    }

    this.http.post('http://localhost:1010/saveWifeHus',this.wifeHus,{headers}).subscribe({
      next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          this.errorMessage = "";
      },
      error : ()=>{
          this.errorMessage = "Data Not Saved , Please Check !!!";
          this.successMessage = "";
      }
    });

    this.http.post('http://localhost:1010/saveChild',this.child,{headers}).subscribe({
      next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          this.errorMessage = "";
      },
      error : ()=>{
          this.errorMessage = "Data Not Saved , Please Check !!!";
          this.successMessage = "";
      }
    });

    familydetailsform.reset();

    
  }

  nameexpression = "^[a-zA-Z .]+$";

  resetFamilyDetailsForm(familydetailsform : NgForm){
      familydetailsform.reset();
      this.showFather = "hidden";
      this.showMother = "hidden";
      this.showWifeHus = "hidden";
      this.showChild = "hidden";
  }

  deleteFather(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteFather/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : ()=>{
        this.getFather(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  deleteMother(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteMother/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : ()=>{
        this.getMother(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  deleteWifeHus(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteWifeHus/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : ()=>{
        this.getWifeHus(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  deleteChild(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteChild/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : ()=>{
        this.getChild(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }


}
