import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {


  itemList: AngularFireList<any>
  itemArray = []

  data = {
    name : '',
    phone : '',
    skill : '',
    province : '',
    price : '',
    comment: '',
    email: ''
  };

  myUid = localStorage.getItem('uid')

  constructor(public db:AngularFireDatabase, public router: Router) { 
  	this.itemList = db.list('skills')

  	this.itemList.snapshotChanges()
  	.subscribe(actions=>{
  		actions.forEach(action=>{
	  		let y = action.payload.toJSON()
	  		y['$key'] = action.key
	  		this.itemArray.push(y as ListItemClass)
  	})
  		console.log(this.itemArray);
		})
  }

  ngOnInit() {
  }


  editform($key){
    for (let value of this.itemArray) {

      if(value['$key'] == $key) {
        this.data.email = value['email'];
        this.data.name = value['name'];
        this.data.phone = value['phone'];
        this.data.skill = value['skill'];
        this.data.province = value['province']; 
        this.data.price = value['price'];
        this.data.comment = value['comment'];
      }

    }
  }
  onEdit($key){
    this.data.email
    this.data.name 
    this.data.phone 
    this.data.skill 
    this.data.province 
    this.data.price 
    this.data.comment
    /* console.log(" key: " + $key + " name: " + this.data.name  + " phone: " + this.data.phone  + " skill: " + this.data.skill  + " province: " + this.data.province  + " price: " + this.data.price + " comment: " + this.data.comment)  */
    this.itemList.set($key , {
      email: this.data.email,
      name : this.data.name,
      phone : this.data.phone,
      skill : this.data.skill,
      province : this.data.province,
      price : this.data.price,
      comment : this.data.comment
    });
    this.itemArray = [];
   this.router.navigate(['/addskill']);
  }
  onDelete($key){
    this.itemList.remove($key);
    this.itemArray = [];
  }

}

export class ListItemClass {
	$key: string;
	name : string;
  phone : string;
  skill : string;
  province : string;
 	price : string;
	comment: string;
  email: string;
}