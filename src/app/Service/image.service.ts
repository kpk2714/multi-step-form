import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient,private authService : AuthService) { }


  uploadImage(file : File) : Observable<any>{

    const formData = new FormData();
    formData.append('file',file);
    return this.http.post('http://localhost:1010/upload/userId='+this.authService.getCurrentLoggedUser(),formData);
  }

  getImage(id : String) : Observable<Blob>{
    return this.http.get('http://localhost:1010/get/image/userId='+id,{responseType : 'blob'});
  }
}
