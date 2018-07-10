import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
data = {
    name : '',
    phone : '',
    skill : '',
    province : '',
    price : '',
    comment: '',
    email: ''
};
email: string;
uid: any;

  itemList: AngularFireList<any>;

  constructor(public fire: AngularFireAuth, public db: AngularFireDatabase, public rout: Router) {
      this.itemList  = db.list('skills');
  }

  ngOnInit() {
//    let list: Array<number> = [1,2,3];
//    console.log(list);
//    console.log(this.data.comment);
  let user = localStorage.getItem('email')
  this.email = user
  console.log(user)
  this.uid = localStorage.getItem('uid')
  console.log(this.uid)

  /*this.fire.authState.subscribe(auth=>{
    if(auth){
      this.uid = auth.uid
      console.log(this.uid)
    }
  });*/


  }

  insertSkill() {
    this.itemList.push({
      name : this.data.name,
      phone : this.data.phone,
      skill : this.data.skill,
      province : this.data.province,
      price : this.data.price,
      comment: this.data.comment,
      email : this.email,
      uid : this.uid
    });
   this.rout.navigate(['/myskill']);
  }

}
