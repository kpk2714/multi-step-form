import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/user/user';
import { Token } from '../login/token/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private router : Router ) { }

  isLogged : boolean = false;

  setIsLoggedTrue(){
    this.isLogged = true;
  }


  setIsLoggedFalse(){
    this.isLogged = false;
  }
  
  logout() {
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.isLogged;
  }

  username : String = "";
  tokenId : any = null;

  setCurrentLoggedUser(token : Token){
    this.username = token.userId;
    this.tokenId = token.tokenId;
  }

  getCurrentLoggedUser(){
    return this.username;
  }

  getToken(){
    return this.tokenId;
  }

  
}
