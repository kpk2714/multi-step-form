import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Event, NavigationStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../login/user/user';
import { Personal } from '../multi-step-registration/candidate-register-form/personal-details/personal';
import { PersonalDetailsComponent } from '../multi-step-registration/candidate-register-form/personal-details/personal-details.component';
import { PersonalService } from '../multi-step-registration/candidate-register-form/personal-details/personal.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate , CanDeactivate<PersonalDetailsComponent> {

  constructor(private authService : AuthService , private router : Router , private personalService : PersonalService ) { }


  canDeactivate(component: PersonalDetailsComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canExist();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if(this.authService.isAuthenticated()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}

export const resolve = ()=>{
  const personalService = inject(PersonalService);
  return personalService.getAllPersonalData();
}
