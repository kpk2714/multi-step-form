import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-two',
  templateUrl: './nav-two.component.html',
  styleUrls: ['./nav-two.component.css']
})
export class NavTwoComponent {

      constructor(private router : Router){}

      textColorHo : String = "";
      bgColorHo : String = "";

      textColorCa : String = "";
      bgColorCa : String = "";

      textColorHe : String = "";
      bgColorHe : String = "";

      changeStyleHo() : void {
          this.textColorHo = "text-orange-400";
          this.bgColorHo = "bg-red-50";

          this.textColorCa = "";
          this.bgColorCa = "";

          this.textColorHe = "";
          this.bgColorHe = "";

          this.router.navigate(['pages/home']);
      }

      changeStyleCa() : void {

        this.router.navigate(['pages/candidate-register']);
        
          this.textColorHo = "";
          this.bgColorHo = "";

          this.textColorCa = "text-orange-400";
          this.bgColorCa = "bg-red-50";

          this.textColorHe = "";
          this.bgColorHe = "";

          
    }

    changeStyleHe() : void {
          this.textColorHo = "";
          this.bgColorHo = "";

          this.textColorCa = "";
          this.bgColorCa = "";

          this.textColorHe = "text-orange-400";
          this.bgColorHe = "bg-red-50";

          this.router.navigate(['pages/helpdesk']);
  }
}
