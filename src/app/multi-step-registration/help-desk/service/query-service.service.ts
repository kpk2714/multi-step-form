import { Injectable } from '@angular/core';
import { QueryData } from '../class/query-data';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReplyData } from '../class/reply-data';
import { AuthService } from 'src/app/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  constructor(private http : HttpClient , private authService : AuthService) { }

  public registerQueryData(queryData : QueryData) : Observable<any>{

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    return  this.http.post("http://localhost:1010/registerquery",queryData,{headers});
  }

  public getAllQueryData(id : String) : Observable<any> {

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());
    
    return this.http.get<QueryData[]>("http://localhost:1010/getAllQuery/userId="+id,{headers});
  }


  scheduleTaskAtSpecificTime(hour: number, minute: number) {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hour, minute, 0, 0);

    if (targetTime < now) {
      targetTime.setDate(targetTime.getDate() + 1); // Schedule for the next day if the time has passed
    }

    const delay = targetTime.getTime() - now.getTime();
    
    setTimeout(() => {
      this.triggerMethod();
    }, delay);
  }

  triggerMethod() {
    console.log('Method triggered at the scheduled time');

    this.getAllQueryData(this.authService.getCurrentLoggedUser()).subscribe({
      next : (data)=>{
        console.log(data);
      }
    })
  }

}
