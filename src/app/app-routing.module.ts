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

const routes: Routes = [
    { path : '' , component : LoginComponent},
    { path : 'pages' , component : MultiStepRegistrationComponent},
    { path : 'pages/home' , component : HomeComponent},
    { path : 'pages/candidate-register' , component : CandidateRegisterFormComponent},
    { path : 'pages/candidate-register/personal-details' , component : PersonalDetailsComponent},
    { path : 'pages/candidate-register/education-details' , component : EducationDetailsComponent},
    { path : 'pages/candidate-register/family-details' , component : FamilyDetailsComponent},
    { path : 'pages/candidate-register/work-experience' , component : WorkExperienceComponent},
    { path : 'pages/candidate-register/technical-skills' , component : TechnicalSkillsComponent},
    { path : 'pages/candidate-register/languages-known' , component : LanguagesKnownComponent},
    { path : 'pages/candidate-register/documents-upload' , component : DocumentsUploadComponent},
    { path : 'pages/candidate-register/education-details' , component : EducationDetailsComponent},
    { path : 'pages/candidate-register/declarations' , component : DeclarationsComponent},
    { path : 'pages/candidate-register/documents-upload/dataprivacy' , component : DataprivacyComponent},
    { path : 'pages/candidate-register/documents-upload/proof-of-age' , component : ProofOfAgeComponent},
    { path : 'pages/helpdesk' , component : HelpDeskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
