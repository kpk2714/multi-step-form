import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Work } from './work';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Width } from 'src/app/Model/width';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {


  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
    private toastr : ToastrService , private router : Router
  ){}

  width : any ;

  companyData!: Work[];

  ngOnInit(){
    
    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.getWidth(headers);
    this.getCompanyData(headers);
    this.verifyCompanyDelete(headers);
  }

  verifyCompanyDelete(headers : any){
    this.getCompanyWidth().subscribe({
      next : (data)=>{
        if(data!=0 && this.companyData?.length==0){
          this.http.delete('http://localhost:1010/deleteWidth/userId='+this.authService.getCurrentLoggedUser()+'/form=Work-Experience',{headers}).subscribe({
            next : ()=>{
              this.getWidth(headers);
            },
            error : (error)=>{
              console.log(error);
            }
          });
        }
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getCompanyWidth() : Observable<any>{
    return this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser()+'/form='+'Work-Experience');
  }

  getWidth(headers : any){
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

  successMessage : String = "";
  errorMessage : String = "";

  workWidth : any = new Width();

  storeWorkExperienceForm(workexperienceform : NgForm) : void {

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.work.userId = this.authService.getCurrentLoggedUser();

    this.http.post('http://localhost:1010/saveCompany',this.work,{headers}).subscribe({
        next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          this.getCompanyData(headers);
        },
        error : ()=>{
          this.errorMessage = "Data not saved . Please Check !!!";
        }
    });

    if(this.companyData.length==0){

        this.workWidth.userId = this.authService.getCurrentLoggedUser();
        this.workWidth.width = 14 + this.width;
        this.workWidth.formname = 'Work-Experience';

        this.http.post('http://localhost:1010/saveWidth',this.workWidth,{headers}).subscribe({
            next : ()=>{
            },
            error : (error)=>{
              console.log(error);
            }
        });
    }

    workexperienceform.reset();
  }

  nameexpression = "^[a-zA-Z .]+$";

  resetWorkExperienceForm(workexperienceform : NgForm) : void {
    workexperienceform.reset();
  }

  deleteWork(companyId : any){

    const tokenId = this.authService.getToken();
    const params = new HttpParams().set('tokenId',tokenId.toString()).set('companyId',companyId);
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteWork/userId='+this.authService.getCurrentLoggedUser(),{params , headers}).subscribe({
      next : ()=>{
        this.getCompanyData(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    })
  }
}
