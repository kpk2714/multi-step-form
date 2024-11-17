import { Component, OnInit } from '@angular/core';
import { QueryData } from '../class/query-data';
import { ReplyData } from '../class/reply-data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  constructor(private http : HttpClient , private authService : AuthService , private toastr : ToastrService , private router : Router){}

  query!: QueryData;

  ngOnInit(): void {
    this.query = history.state;

    this.getReply();
  }

  viewRequestVar : String = "inline";

    viewRequestColor : String = "text-orange-400";
    viewRequestFont : String = "font-bold";

    viewRequest() : void {
        this.viewRequestVar = "inline";
        this.viewRequestColor = "text-orange-400";
        this.viewRequestFont = "font-bold";
    }

    count : number = 0;

    increaseCount() : void {
        this.count++;
        console.log(this.count);
    }

    reply!: any;

    getReply(){

      const tokenId = this.authService.getToken();
      const params = new HttpParams().set('userId',this.authService.getCurrentLoggedUser().toString());
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());
        this.http.get('http://localhost:1010/getReply/requestId='+this.query.id,{params : params, headers : headers}).subscribe({
          next : (data)=>{
              this.reply = data;
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
}
