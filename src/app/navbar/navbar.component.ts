import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import { AngularFireModule } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	user: Observable<firebase.User>;
	private isLoggedIn: Boolean= false;
	private email: String;

  constructor( public afauth: AngularFireAuth , public rout: Router) { 
  	
    let status = localStorage.getItem('isLoggedIn'); /* SetItem=> store In Item --- getItem=> Take A value */
    console.log(status);
    if (status === 'true' ) {
      this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
    /*firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.rout.navigate(['/login']);
      }
    });*/

  }

  ngOnInit() {
  }

  logout(){
  	this.afauth.auth.signOut();
  	this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn','false');
  	this.rout.navigate(['/login']);
  }

}
