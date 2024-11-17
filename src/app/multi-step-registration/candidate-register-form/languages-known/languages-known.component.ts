import { Component } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { Language } from './language';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Width } from 'src/app/Model/width';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-languages-known',
  templateUrl: './languages-known.component.html',
  styleUrls: ['./languages-known.component.css']
})
export class LanguagesKnownComponent {

  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
    private router : Router , private toastr : ToastrService
  ){}

  width : any;

  languageData!: any[];

  ngOnInit(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.getWidth(headers);
    this.getLanguageData(headers);
    this.verifyLanguageDelete(headers);
  }

  verifyLanguageDelete(headers : any){
    this.getLanguageWidth().subscribe({
      next : (data)=>{
        if(data!=0 && this.languageData?.length==0){
          this.http.delete('http://localhost:1010/deleteWidth/userId='+this.authService.getCurrentLoggedUser()+'/form=Language',{headers}).subscribe({
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

  getLanguageWidth() : Observable<any>{
    return this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser()+'/form='+'Language');
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

  showSaveCancelButton : String = "hidden";

  showLanguage : String = "hidden";

  showAllLanguages : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddLanguage() : void{
    this.showAllLanguages = "hidden";
    this.showButton = "hidden";
    this.showEditDetails = "inline-block";
    this.showLanguage = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  language = new Language();

  successMessage : String = "";
  errorMessage : String = "";

  newWidth : any = new Width();

  storeLanguageForm(languageform : NgForm) : void {

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      this.language.userId = this.authService.getCurrentLoggedUser();
      this.language.languageId = this.language.languageCode?.substring(0,1)+''+
                      this.language.languageCode?.substring(this.language.languageCode.length-1,this.language.languageCode.length) + '' + 
                      this.language.languageType?.substring(0,1)+'101';

      this.http.post('http://localhost:1010/saveLanguage',this.language,{headers}).subscribe({
        next : ()=>{
          this.successMessage = "Data Saved Successfully !!!";
          
        },
        error : ()=>{
          this.errorMessage = "Data not saved , Please Check !!!";
        }
      });

      
      if(this.languageData.length==0){

          this.newWidth.userId = this.authService.getCurrentLoggedUser();
          this.newWidth.width = 14 + this.width;
          this.newWidth.formname = 'Language';

          this.http.post('http://localhost:1010/saveWidth',this.newWidth,{headers}).subscribe({
              next : ()=>{
              },
              error : (error)=>{
                console.log(error);
              }
          });
      }

      languageform.reset();
  }

  nameexpression = "^[a-zA-Z .]+$";

  resetLanguageForm(languageform : NgForm) : void {
    languageform.reset();
  }

  deleteLanguage(id : String){

      const tokenId = this.authService.getToken();
      const params = new HttpParams().set('userId',this.authService.getCurrentLoggedUser().toString());
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      this.http.delete('http://localhost:1010/deleteLanguage/languageId='+id,{params,headers}).subscribe({
        next : ()=>{
            this.getLanguageData(headers);
        },
        error : (error)=>{
          console.log(error);
        }
      });
  }
}
