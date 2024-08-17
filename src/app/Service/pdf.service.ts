import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http : HttpClient , private authService : AuthService) { }

  upload(url : string , file : File , name : string , status : string) : Observable<any> {

      const formData : FormData = new FormData();
      formData.append('file',file);
      formData.append('status',status);
      formData.append('userId',this.authService.getCurrentLoggedUser().toString());
      formData.append('documentName',name);

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId.toString());

      return this.http.post(url,formData,{headers});
  }

  getPdf(url : string , documentName : String) : Observable<Blob> {

    const params = new HttpParams().set('userId',this.authService.getCurrentLoggedUser().toString()).set('documentName',documentName.toString());
    
    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    return this.http.get(url,{responseType : 'blob',headers : headers , params : params});
  }
}
