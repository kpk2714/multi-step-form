import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Declarations } from './declarations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Width } from 'src/app/Model/width';
import { Secondary } from '../education-details/secondary';
import { Father } from '../family-details/father';
import { Personal } from '../personal-details/personal';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.css']
})
export class DeclarationsComponent {

  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
    private router : Router , private toastr : ToastrService
  ){}

  width : any;

  @ViewChild('dec1') dec1! : ElementRef;
  @ViewChild('dec2') dec2! : ElementRef;

  personal : any= new Personal();
  educationData  : any = new Secondary();
  familyData : any = new Father();
  companyData : any[] = [];
  technicalData : any[] = [];
  languageData : any[] = [];

  declarationData : any = new Declarations();

  isComplete : boolean = false;

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
        if(error.error.message==='Token Mismatch Exception Occurred !!!'){
          this.toastr.warning('Session Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
          this.router.navigate(['/login']);
        }
      }
    });

    this.http.get('http://localhost:1010/getDeclaration/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : ()=>{
          this.dec1.nativeElement.checked = true;
          this.dec2.nativeElement.checked = true;
          this.isBtnClicked = true;
        },
        error : (error)=>{
          console.log(error);
        }
    });

    this.http.get('http://localhost:1010/getAllWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data : any)=>{
        this.checkDocumentUpload(data);
      },
      error : (error)=>{
        console.log(error);
      }
    });

    this.getPersonal(headers);
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

  getPersonal(headers : any){
    this.http.get('http://localhost:1010/getPersonal/id='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.personal = data;
      },
      error : (error)=>{
        console.log(error);
      }
    })
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

  getDeclarationData(headers : any){
    this.http.get('http://localhost:1010/getDeclaration/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data : any)=>{
        this.declarationData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  declare = new Declarations();

  isBtnClicked : boolean = false;

  storeDeclarationForm(declarationForm : NgForm) : void {

    this.declare.userId = this.authService.getCurrentLoggedUser();

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.post('http://localhost:1010/saveDeclaration',this.declare,{headers}).subscribe({
        next : ()=>{
          this.isBtnClicked = true;
        },
        error : (error)=>{
            console.log(error);
        }
    });
  }
}
