import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Personal } from '../candidate-register-form/personal-details/personal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Width } from 'src/app/Model/width';
import { Secondary } from '../candidate-register-form/education-details/secondary';
import { Father } from '../candidate-register-form/family-details/father';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  time : any = new Date().getHours();

  width : any;

  personal : any= new Personal();
  educationData  : any = new Secondary();
  familyData : any = new Father();
  companyData !: any[];
  technicalData !: any[];
  languageData !: any[];

  isComplete : boolean = false;

  constructor(private http : HttpClient , private authService : AuthService , private toastr : ToastrService , private router : Router){}
  
  ngOnInit(): void {

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId);

      this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : (data)=>{
          this.width = data;
        },
        error : (error)=>{
          if(error.error.message==='Token Expired !!!'){
            this.toastr.warning('Token Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
            this.router.navigate(['/login']);
          }
          if(error.error.message==='Token Mismatch Exception Occurred !!!'){
            this.toastr.warning('Session Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
            this.router.navigate(['/login']);
          }
        }
      });

      this.http.get('http://localhost:1010/getPersonal/id='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : (data)=>{
          this.personal = data;
        },
        error : (error)=>{
          console.log(error);
        }
      })

      this.http.get('http://localhost:1010/getAllWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
          next : (data : any)=>{
            this.checkDocumentUpload(data);
          },
          error : (error)=>{
            console.log(error);
          }
      });

      this.getSecondary(headers);
      this.getFamily(headers);
      this.getCompanyData(headers);
      this.getTechnicalData(headers);
      this.getLanguageData(headers);
  }

  checkDocumentUpload(data : any[]){
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.formname==='Documents'){
        this.isComplete = true;
      }
    }
  }

  getSecondary(headers : any){
    this.http.get('http://localhost:1010/get/secondary/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.educationData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getFamily(headers : any){
    this.http.get('http://localhost:1010/getFather/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
        next : (data : any)=>{
          this.familyData = data;
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }

  getCompanyData(headers : any){
    this.http.get('http://localhost:1010/getCompany/userId='+this.authService.getCurrentLoggedUser() , {headers}).subscribe({
      next : (data : any)=>{
        this.companyData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getTechnicalData(headers : any){
    this.http.get('http://localhost:1010/getTechnical/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data : any)=>{
        this.technicalData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getLanguageData(headers : any){
    this.http.get('http://localhost:1010/getLanguage/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data : any)=>{
        this.languageData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  pendingForm : String = "hidden";

  pendingFormDesign : String = "false";

  activeFormDesign : String = "false";


  pendingFormStatus(){
    this.pendingForm = "inline-block";
    this.activeForm = "hidden";

    this.pendingFormDesign = "true";
    this.activeFormDesign = "false";
  }

  activeForm : String = "hidden";

  activeFormStatus(){
    this.activeForm = "inline-block";
    this.pendingForm = "hidden";

    this.activeFormDesign = "true";
    this.pendingFormDesign = "false";
  }

  optionalSpace : String = "inline-block";
}
