import { Component, OnInit, Query } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryData } from './class/query-data';
import { QueryServiceService } from './service/query-service.service';
import { HttpClient } from '@angular/common/http';
import { ReplyData } from './class/reply-data';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.css']
})
export class HelpDeskComponent implements OnInit {

    constructor(private service : QueryServiceService,private http : HttpClient , private authService : AuthService , 
        private toastr : ToastrService , private router : Router
    ){}

    ngOnInit(): void {
      this.getAllQuery();
    }

    addRequestVar : String = "hidden";

    addRequestColor : String = "";
    addRequestFont : String = "";

    addRequest() : void {
        this.addRequestVar = "inline";
        this.viewRequestVar = "hidden";

        this.addRequestColor = "text-orange-400";
        this.addRequestFont = "font-bold";

        this.viewRequestColor = "";
        this.viewRequestFont = "";
    }

    viewRequestVar : String = "inline";

    viewRequestColor : String = "text-orange-400";
    viewRequestFont : String = "font-bold";

    viewRequest() : void {
        this.viewRequestVar = "inline";
        this.addRequestVar = "hidden";

        this.viewRequestColor = "text-orange-400";
        this.viewRequestFont = "font-bold";

        this.addRequestColor = "";
        this.addRequestFont = "";

        this.successMessage = "";
        this.errorMessage = "";

        this.getAllQuery();
    }


    cancelRequest(queryform : NgForm) : void{
        this.viewRequest();
        queryform.reset();
    }


    queryData = new QueryData();

    errorMessage : String = "";
    successMessage : String = "";


    registerQueryForm(queryForm : NgForm) : void{

        if(this.queryData.category!=null && this.queryData.description!=null){

            this.queryData.userId = this.authService.getCurrentLoggedUser();

            this.service.registerQueryData(this.queryData).subscribe({
                next : () => {
                    queryForm.reset();
                    this.successMessage = "Query Saved Successfully !!!";
                  },
                error : (error) => {
                    queryForm.reset();
                    this.errorMessage = "Query Not Saved , Please Check !!!";

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
        else{

        }
    }


    query : any = [];

    getAllQuery() : void {
        this.service.getAllQueryData(this.authService.getCurrentLoggedUser()).subscribe({
            next : (result : any)=>{
                this.query = result;
            },
            error : (error)=>{
                if(error.error.message==='Token Expired !!!'){
                  this.toastr.warning('Token Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
                  this.router.navigate(['/login']);
                }
            }
        });
    }

    count : number = 0;

    increaseCount() : void {
        this.count++;
        console.log(this.count);
    }
}
