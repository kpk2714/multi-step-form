import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../sharedService/service.service';
import { NgForm } from '@angular/forms';
import { Declarations } from './declarations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
