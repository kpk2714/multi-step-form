import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiStepRegistrationComponent } from './multi-step-registration/multi-step-registration.component';
import { HomeComponent } from './multi-step-registration/home/home.component';
import { CandidateRegisterFormComponent } from './multi-step-registration/candidate-register-form/candidate-register-form.component';
import { HelpDeskComponent } from './multi-step-registration/help-desk/help-desk.component';
import { PersonalDetailsComponent } from './multi-step-registration/candidate-register-form/personal-details/personal-details.component';
import { LoginComponent } from './login/login.component';
import { EducationDetailsComponent } from './multi-step-registration/candidate-register-form/education-details/education-details.component';
import { FamilyDetailsComponent } from './multi-step-registration/candidate-register-form/family-details/family-details.component';
import { WorkExperienceComponent } from './multi-step-registration/candidate-register-form/work-experience/work-experience.component';
import { TechnicalSkillsComponent } from './multi-step-registration/candidate-register-form/technical-skills/technical-skills.component';
import { LanguagesKnownComponent } from './multi-step-registration/candidate-register-form/languages-known/languages-known.component';
import { DocumentsUploadComponent } from './multi-step-registration/candidate-register-form/documents-upload/documents-upload.component';
import { DeclarationsComponent } from './multi-step-registration/candidate-register-form/declarations/declarations.component';
import { DataprivacyComponent } from './multi-step-registration/candidate-register-form/documents-upload/dataprivacy/dataprivacy.component';
import { ProofOfAgeComponent } from './multi-step-registration/candidate-register-form/documents-upload/proof-of-age/proof-of-age.component';
import { AuthGuardService, resolve } from './Service/auth-guard.service';
import { ReplyComponent } from './multi-step-registration/help-desk/reply/reply.component';

const routes: Routes = [
    { path : '' , component : LoginComponent},
    { path : 'login' , component : LoginComponent},
    { path : 'pages' , component : MultiStepRegistrationComponent , canActivate : [AuthGuardService]},
    { path : 'pages/home' , component : HomeComponent, canActivate : [AuthGuardService]},
    { path : 'pages/candidate-register' , component : CandidateRegisterFormComponent , canActivate : [AuthGuardService] },

    { path : 'pages/candidate-register' , canActivate : [AuthGuardService] , children : [

      { path : 'personal-details' , component : PersonalDetailsComponent , canDeactivate : [AuthGuardService] , resolve : {personalData : resolve} },
      { path : 'education-details' , component : EducationDetailsComponent},
      { path : 'family-details' , component : FamilyDetailsComponent},
      { path : 'work-experience' , component : WorkExperienceComponent},
      { path : 'technical-skills' , component : TechnicalSkillsComponent},
      { path : 'languages-known' , component : LanguagesKnownComponent},
      { path : 'documents-upload' , component : DocumentsUploadComponent},
      { path : 'education-details' , component : EducationDetailsComponent},
      { path : 'declarations' , component : DeclarationsComponent},
      { path : 'documents-upload/dataprivacy' , component : DataprivacyComponent},
      { path : 'documents-upload/proof-of-age' , component : ProofOfAgeComponent},

    ]},

    
    { path : 'pages/helpdesk' , component : HelpDeskComponent , canActivate : [AuthGuardService]},

    { path : 'pages/helpdesk' , canActivate : [AuthGuardService] , children : [
      { path : 'reply' , component : ReplyComponent }
    ]},

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
