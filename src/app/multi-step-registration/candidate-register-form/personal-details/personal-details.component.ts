import { Component } from '@angular/core';
import { PersonalService } from './personal.service';
import { NgForm, NgModel } from '@angular/forms';
import { Personal } from './personal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../sharedService/service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
    

    constructor(private service : PersonalService,private Sservice:ServiceService){}

    state : any = [];
    district : any = [];

    width : any = 0;

    ngOnInit(){
        this.state = this.service.state();
        this.Sservice.setMessage(this.width);
    }

    onSelectStateDist(stateId : any){
      this.district = this.service.district().filter(e => e.sid == stateId.target.value);
    }

    drivingHidden : String = "hidden";

    drivinglicenseYes() : void {
        this.drivingHidden = "inline";
    }

    drivinglicenseNo() : void {
      this.drivingHidden = "hidden";
      this.personal.drivinglicensenumber = "Do not Have";
      this.personal.drivinglicensename = "Do not Have";
      this.personal.drivinglicenseplace = "Do not Have";
    }

    pancardHidden : String = "hidden";

    panCardYes() : void {
      this.pancardHidden = "inline";
    }

    panCardNo() : void {
      this.pancardHidden = "hidden";
      this.personal.pancardnumber = "Do not Have";
      this.personal.pancardname = "Do not Have";
      this.personal.pancardplace = "Do not Have";
    }

    votercardHidden : String = "hidden";

    voterCardYes() : void {
      this.votercardHidden = "inline";
    }

    voterCardNo() : void {
      this.votercardHidden = "hidden";
      this.personal.votercardnumber = "Do not Have";
      this.personal.votercardname = "Do not Have";
      this.personal.votercardplace = "Do not Have";
    }

    passportHidden : String = "hidden";

    passportYes() : void {
      this.passportHidden = "inline";
    }

    passportNo() : void {
      this.passportHidden = "hidden";
      this.personal.passportnumber = "Do not Have";
      this.personal.passportname = "Do not Have";
      this.personal.passportplace = "Do not Have";
    }

    personal = new Personal();

    storePersonalForm( personalform : NgForm ) : void {
        // this.toastr.success("Data Saved Successfully","" , { timeOut : 1000});
        this.Sservice.setMessage(this.width+12);
    }

    resetPersonalForm( personalform : NgForm ) : void {
        personalform.reset();
        this.drivingHidden = "hidden";
        this.pancardHidden = "hidden";
        this.votercardHidden = "hidden";
        this.passportHidden = "hidden";
    }


    outline : String = "focus:outline-none";

    nameexpression = "^[a-zA-Z .]+$";

    url : any = "assets/images/person.jpg";

    uploadImage(e :  any) {
        if(e.target.files){
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event : any)=>{
              this.url = event.target.result;
            }
        }
    }

}
