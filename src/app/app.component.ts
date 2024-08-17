import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router , Event } from '@angular/router';
import { IdleTimerService } from './Service/idle-timer.service';
import { QueryServiceService } from './multi-step-registration/help-desk/service/query-service.service';
import { AuthService } from './Service/auth.service';
import { HelpDeskComponent } from './multi-step-registration/help-desk/help-desk.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'multi-step-form';

  showLoader : boolean = false;

  router = inject(Router);

  constructor(private idleTimerService: IdleTimerService , private queryService : QueryServiceService) {}

  ngOnInit(): void {
    this.router.events.subscribe((routerEvents : Event)=>{
      if(routerEvents instanceof NavigationStart){
        this.showLoader = true;
      }
      
      if(routerEvents instanceof NavigationEnd || routerEvents instanceof NavigationCancel || routerEvents instanceof NavigationError){
        this.showLoader = false;
      }

    });

    for(let i=0;i<24;i++){
      this.queryService.scheduleTaskAtSpecificTime(i, 0); // Schedule for Every Hour
    }

     
  }

  
}
