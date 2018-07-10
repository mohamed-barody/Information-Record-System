import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule  } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage'


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddskillComponent } from './addskill/addskill.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyskillComponent } from './myskill/myskill.component';
import { SkillsComponent } from './skills/skills.component';
import { InformationComponent } from './information/information.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo:'home' , pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addskill', component: AddskillComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myskill', component: MyskillComponent },
  { path: 'allskills', component: SkillsComponent },
  { path: 'info/:id', component: InformationComponent },
  { path: 'userprofile', component: UserprofileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddskillComponent,
    LoginComponent,
    RegisterComponent,
    MyskillComponent,
    SkillsComponent,
    InformationComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule ,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
