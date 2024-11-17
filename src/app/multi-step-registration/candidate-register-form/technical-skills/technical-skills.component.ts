import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Skill } from './skill';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Width } from 'src/app/Model/width';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent {

  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
    private toastr : ToastrService , private router : Router
  ){}

  width : any;
  technicalData!: Skill[];

  ngOnInit(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.getWidth(headers);
    this.getTechnicalData(headers);
    this.verifyTechnicalDelete(headers);
  }

  verifyTechnicalDelete(headers : any){
    this.getTechnicalWidth().subscribe({
      next : (data)=>{
        if(data!=0 && this.technicalData?.length==0){
          this.http.delete('http://localhost:1010/deleteWidth/userId='+this.authService.getCurrentLoggedUser()+'/form=Technical',{headers}).subscribe({
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

  getTechnicalWidth() : Observable<any>{
    return this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser()+'/form='+'Technical');
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

  successMessage : String = "";
  errorMessage : String = "";

  newWidth : any = new Width();

  storeTechnicalSkillForm(technicalskillform : NgForm) : void {

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.skill.userId = this.authService.getCurrentLoggedUser();

    this.http.post('http://localhost:1010/saveTechnical/userId='+this.authService.getCurrentLoggedUser(),this.skill , {headers}).subscribe({
      next : ()=>{
        this.successMessage = "Data Saved Successfully !!!";
        this.getTechnicalData(headers);
      },
      error : ()=>{
        this.errorMessage = "Data Not Saved , Please Check";
      }
    });


    if(this.technicalData.length==0){

      this.newWidth.userId = this.authService.getCurrentLoggedUser();
      this.newWidth.width = 14 + this.width;
      this.newWidth.formname = 'Technical';
  
      this.http.post('http://localhost:1010/saveWidth',this.newWidth,{headers}).subscribe({
        next : ()=>{
        },
        error : (error)=>{
          console.log(error);
        }
      });
    }

    technicalskillform.reset();
  }

  nameexpression = "^[a-zA-Z .]+$";

  resetTechnicalSkillForm(technicalskillform : NgForm) : void {
    technicalskillform.reset();
  }

  deleteWork(skillId : any){

    const tokenId = this.authService.getToken();
    const params = new HttpParams().set('skillId',skillId);
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteTechnical/userId='+this.authService.getCurrentLoggedUser(),{headers,params}).subscribe({
      next : ()=>{
        this.getTechnicalData(headers);
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }
}
