import { Component } from '@angular/core';
import { Personal } from '../personal-details/personal';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../sharedService/service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Diploma } from './diploma';
import { HigherSecondry } from './higher-secondry';
import { Graduation } from './graduation';
import { Secondary } from './secondary';
import { Width } from 'src/app/Model/width';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent {

  constructor(private Sservice : ServiceService , private http : HttpClient , private authService : AuthService , 
      private toastr : ToastrService , private router : Router
  ){}

  width : any;

  secondaryData  : any = new Secondary();
  hsData : any= new HigherSecondry();
  diplomaData : any = new Diploma();
  graduationData : any = new Graduation();

  successMessage : String = "";
  errorMessage : String = "";

  ngOnInit(){
    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.getWidth(headers);
    
    this.getSecondary(headers);
    this.getHigherSecondary(headers);
    this.getDiploma(headers);
    this.getGraduation(headers);

    this.getEducationWidth().subscribe({
      next : (data)=>{
        if(data!=0 && this.secondaryData==null && this.hsData==null && this.diplomaData==null && this.graduationData==null){
          this.http.delete('http://localhost:1010/deleteWidth/userId='+this.authService.getCurrentLoggedUser()+'/form=Education',{headers}).subscribe({
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
    })
  }

  getEducationWidth() : Observable<any>{
    return this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser()+'/form='+'Education');
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

  getSecondary(headers : any){
    this.http.get('http://localhost:1010/get/secondary/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.secondaryData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getHigherSecondary(headers : any){
    this.http.get('http://localhost:1010/get/highersecondary/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.hsData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getDiploma(headers : any){
    this.http.get('http://localhost:1010/get/diploma/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.diplomaData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  getGraduation(headers : any){
    this.http.get('http://localhost:1010/get/graduation/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.graduationData = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  showEducation : String = "inline-block";
  showButton : String = "inline-block";
  showEditDetails : String = "hidden";

  AddEducation() : void{
      this.showEducation = "hidden";
      this.showButton = "hidden";
      this.showEditDetails = "inline";
  }

  personal = new Personal();

  diploma = new Diploma();

  hs = new HigherSecondry();

  graduation = new Graduation();

  secondary = new Secondary();

  showSecondary : String = "hidden";

  secondaryYes() : void{
    this.showSecondary = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  secondaryNo(educationform : NgForm) : void{
    this.showSecondary = "hidden";

    educationform.controls['secdegree'].setValue(' ');
    educationform.controls['secschool'].setValue(' ');
    educationform.controls['secduration'].setValue(' ');
    educationform.controls['secstartdate'].setValue(' ');
    educationform.controls['secenddate'].setValue(' ');
    educationform.controls['secboard'].setValue(' ');
    educationform.controls['secbranch'].setValue(' ');
    educationform.controls['sectotalscore'].setValue(' ');
    educationform.controls['sectotalmarks'].setValue(' ');
    educationform.controls['secpercentage'].setValue(' ');
    educationform.controls['secschoolstate'].setValue(' ');
    educationform.controls['secschoolcity'].setValue(' ');
    educationform.controls['secsubject1name'].setValue(' ');
    educationform.controls['secsubject3name'].setValue(' ');
    educationform.controls['secsubject1marks'].setValue(' ');
    educationform.controls['secsubject2name'].setValue(' ');
    educationform.controls['secsubject2marks'].setValue(' ');
    educationform.controls['secsubject3marks'].setValue(' ');
    educationform.controls['secsubject4name'].setValue(' ');
    educationform.controls['secsubject4marks'].setValue(' ');
    educationform.controls['secsubject5name'].setValue(' ');
    educationform.controls['secsubject7name'].setValue(' ');
    educationform.controls['secsubject5marks'].setValue(' ');
    educationform.controls['secsubject6name'].setValue(' ');
    educationform.controls['secsubject6marks'].setValue(' ');
    educationform.controls['secsubject7marks'].setValue(' ');
    educationform.controls['secsubject8name'].setValue(' ');
    educationform.controls['secsubject8marks'].setValue(' ');
  }

  showHigherSecondary : String = "hidden";

  highersecondaryYes() : void{
    this.showHigherSecondary = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  highersecondaryNo(educationform : NgForm) : void{
    this.showHigherSecondary = "hidden";

    educationform.controls['highsecdegree'].setValue(' ');
    educationform.controls['highsecduration'].setValue(' ');
    educationform.controls['highsecstartdate'].setValue(' ');
    educationform.controls['highsecenddate'].setValue(' ');
    educationform.controls['highsecschool'].setValue(' ');
    educationform.controls['highsecboard'].setValue(' ');
    educationform.controls['highsecbranch'].setValue(' ');
    educationform.controls['highsectotalscore'].setValue(' ');
    educationform.controls['highsectotalmarks'].setValue(' ');
    educationform.controls['highsecpercentage'].setValue(' ');
    educationform.controls['highsecschoolstate'].setValue(' ');
    educationform.controls['highsecschoolcity'].setValue(' ');
    educationform.controls['highsecsubject1name'].setValue(' ');
    educationform.controls['highsecsubject1marks'].setValue(' ');
    educationform.controls['highsecsubject2name'].setValue(' ');
    educationform.controls['highsecsubject2marks'].setValue(' ');
    educationform.controls['highsecsubject3name'].setValue(' ');
    educationform.controls['highsecsubject3marks'].setValue(' ');
    educationform.controls['highsecsubject4name'].setValue(' ');
    educationform.controls['highsecsubject4marks'].setValue(' ');
    educationform.controls['highsecsubject5name'].setValue(' ');
    educationform.controls['highsecsubject5marks'].setValue(' ');
    educationform.controls['highsecsubject6name'].setValue(' ');
    educationform.controls['highsecsubject6marks'].setValue(' ');
  }

  showDiploma : String = "hidden";

  DiplomaYes() : void{
    this.showDiploma = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  DiplomaNo(educationform : NgForm) : void{
    this.showDiploma = "hidden";

    educationform.controls['diplomadegree'].setValue(' ');
    educationform.controls['diplomaduration'].setValue(' ');
    educationform.controls['diplomastartdate'].setValue(' ');
    educationform.controls['diplomaenddate'].setValue(' ');
    educationform.controls['diplomaschool'].setValue(' ');
    educationform.controls['diplomaboard'].setValue(' ');
    educationform.controls['diplomabranch'].setValue(' ');
    educationform.controls['diplomacgpa'].setValue(' ');
    educationform.controls['diplomapercentage'].setValue(' ');
    educationform.controls['diplomaschoolstate'].setValue(' ');
    educationform.controls['diplomaschoolcity'].setValue(' ');
    educationform.controls['diplomasemester1sgpa'].setValue(' ');
    educationform.controls['diplomasemester1cgpa'].setValue(' ');
    educationform.controls['diplomasemester1backlog'].setValue(' ');
    educationform.controls['diplomasemester1percentage'].setValue(' ');
    educationform.controls['diplomasemester2sgpa'].setValue(' ');
    educationform.controls['diplomasemester2cgpa'].setValue(' ');
    educationform.controls['diplomasemester2backlog'].setValue(' ');
    educationform.controls['diplomasemester2percentage'].setValue(' ');
    educationform.controls['diplomasemester3sgpa'].setValue(' ');
    educationform.controls['diplomasemester3cgpa'].setValue(' ');
    educationform.controls['diplomasemester3backlog'].setValue(' ');
    educationform.controls['diplomasemester3percentage'].setValue(' ');
    educationform.controls['diplomasemester4sgpa'].setValue(' ');
    educationform.controls['diplomasemester4cgpa'].setValue(' ');
    educationform.controls['diplomasemester4backlog'].setValue(' ');
    educationform.controls['diplomasemester4percentage'].setValue(' ');
    educationform.controls['diplomasemester5sgpa'].setValue(' ');
    educationform.controls['diplomasemester5cgpa'].setValue(' ');
    educationform.controls['diplomasemester5backlog'].setValue(' ');
    educationform.controls['diplomasemester5percentage'].setValue(' ');
    educationform.controls['diplomasemester6sgpa'].setValue(' ');
    educationform.controls['diplomasemester6cgpa'].setValue(' ');
    educationform.controls['diplomasemester6backlog'].setValue(' ');
    educationform.controls['diplomasemester6percentage'].setValue(' ');
  }

  showGraduation : String = "hidden";

  GraduationYes() : void{
    this.showGraduation = "inline-block";
    this.showSaveCancelButton = "inline-block";
  }

  GraduationNo(educationform : NgForm) : void {
    this.showGraduation = "hidden";

    educationform.controls['graduationdegree'].setValue(' ');
    educationform.controls['graduationduration'].setValue(' ');
    educationform.controls['graduationstartdate'].setValue(' ');
    educationform.controls['graduationenddate'].setValue(' ');
    educationform.controls['graduationschool'].setValue(' ');
    educationform.controls['graduationboard'].setValue(' ');
    educationform.controls['graduationbranch'].setValue(' ');
    educationform.controls['graduationcgpa'].setValue(' ');
    educationform.controls['graduationpercentage'].setValue(' ');
    educationform.controls['graduationschoolstate'].setValue(' ');
    educationform.controls['graduationschoolcity'].setValue(' ');
    educationform.controls['graduationsemester1sgpa'].setValue(' ');
    educationform.controls['graduationsemester1cgpa'].setValue(' ');
    educationform.controls['graduationsemester1backlog'].setValue(' ');
    educationform.controls['graduationsemester1percentage'].setValue(' ');
    educationform.controls['graduationsemester2sgpa'].setValue(' ');
    educationform.controls['graduationsemester2cgpa'].setValue(' ');
    educationform.controls['graduationsemester2backlog'].setValue(' ');
    educationform.controls['graduationsemester2percentage'].setValue(' ');
    educationform.controls['graduationsemester3sgpa'].setValue(' ');
    educationform.controls['graduationsemester3cgpa'].setValue(' ');
    educationform.controls['graduationsemester3backlog'].setValue(' ');
    educationform.controls['graduationsemester3percentage'].setValue(' ');
    educationform.controls['graduationsemester4sgpa'].setValue(' ');
    educationform.controls['graduationsemester4cgpa'].setValue(' ');
    educationform.controls['graduationsemester4backlog'].setValue(' ');
    educationform.controls['graduationsemester4percentage'].setValue(' ');
    educationform.controls['graduationsemester5sgpa'].setValue(' ');
    educationform.controls['graduationsemester5cgpa'].setValue(' ');
    educationform.controls['graduationsemester5backlog'].setValue(' ');
    educationform.controls['graduationsemester5percentage'].setValue(' ');
    educationform.controls['graduationsemester6sgpa'].setValue(' ');
    educationform.controls['graduationsemester6cgpa'].setValue(' ');
    educationform.controls['graduationsemester6backlog'].setValue(' ');
    educationform.controls['graduationsemester6percentage'].setValue(' ');
    educationform.controls['graduationsemester7sgpa'].setValue(' ');
    educationform.controls['graduationsemester7cgpa'].setValue(' ');
    educationform.controls['graduationsemester7backlog'].setValue(' ');
    educationform.controls['graduationsemester7percentage'].setValue(' ');
    educationform.controls['graduationsemester8sgpa'].setValue(' ');
    educationform.controls['graduationsemester8cgpa'].setValue(' ');
    educationform.controls['graduationsemester8backlog'].setValue(' ');
    educationform.controls['graduationsemester8percentage'].setValue(' ');
  }

  educationWidth = new Width();

  storeEducationForm( educationform : NgForm ) : void {

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());
    
      this.http.post('http://localhost:1010/save/secondary/userId='+this.authService.getCurrentLoggedUser(),this.secondary,{headers}).subscribe({
          next : (data)=>{
            console.log(data);
            this.successMessage = "Data Saved Successfully !!!";
          },
          error : (error)=>{
            console.log(error);
            this.errorMessage = "Data not saved !!!";
          }
      });

      this.http.post('http://localhost:1010/save/highsecondary/userId='+this.authService.getCurrentLoggedUser(),this.hs,{headers}).subscribe({
        next : (data)=>{
          console.log(data);
          this.successMessage = "Data Saved Successfully !!!";
        },
        error : (error)=>{
          console.log(error);
          this.errorMessage = "Data not saved !!!";
        }
      });

      this.http.post('http://localhost:1010/save/diploma/userId='+this.authService.getCurrentLoggedUser(),this.diploma,{headers}).subscribe({
        next : (data)=>{
          console.log(data);
          this.successMessage = "Data Saved Successfully !!!";
        },
        error : (error)=>{
          console.log(error);
          this.errorMessage = "Data not saved !!!";
        }
      });

      this.http.post('http://localhost:1010/save/graduation/userId='+this.authService.getCurrentLoggedUser(),this.graduation,{headers}).subscribe({
        next : (data)=>{
          console.log(data);
          this.successMessage = "Data Saved Successfully !!!";
        },
        error : (error)=>{
          console.log(error);
          this.errorMessage = "Data not saved !!!";
        }
      });

      educationform.reset();

      this.educationWidth.userId = this.authService.getCurrentLoggedUser();
      this.educationWidth.width = 14 + this.width;
      this.educationWidth.formname = 'Education';
      

      this.http.post('http://localhost:1010/saveWidth',this.educationWidth,{headers}).subscribe({
          next : ()=>{
            console.log("Width Saved");
          },
          error : ()=>{
            console.log("Width Not Saved");
          }
      })

      
  }

  resetEducationForm( educationform : NgForm ) : void {
      educationform.reset();
      this.showSecondary = "hidden";
      this.showHigherSecondary = "hidden";
      this.showDiploma = "hidden";
      this.showGraduation = "hidden";
  }

  showSaveCancelButton : String = "hidden";

  deleteSecondary(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteSecondary/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : ()=>{
            this.getSecondary(headers);
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }


  deleteHigherSecondary(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteHigherSecondary/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : ()=>{
            this.getHigherSecondary(headers);
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }


  deleteDiploma(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteDiploma/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : ()=>{
            this.getDiploma(headers);
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }


  deleteGraduation(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.delete('http://localhost:1010/deleteGraduation/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : ()=>{
            this.getGraduation(headers);
        },
        error : (error)=>{
          console.log(error);
        }
    });
  }

}
