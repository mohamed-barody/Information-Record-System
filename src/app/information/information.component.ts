import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

id:any;
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
  constructor(public db:AngularFireDatabase, public route: ActivatedRoute) {

  	this.route.params.subscribe( params => {
  		this.id = params
	});

	this.itemList = db.list('skills')

  	this.itemList.snapshotChanges()
  	.subscribe(actions=>{
  		actions.forEach(action=>{
	  		let y = action.payload.toJSON()
	  		y['$key'] = action.key
	  		if(action.key === this.id['id']) {
	  			this.itemArray.push(y as ListItemClass)
	  			this.data.name = this.itemArray[0]['name']
	  			this.data.phone = this.itemArray[0]['phone']
	  			this.data.skill = this.itemArray[0]['skill']
	  			this.data.province = this.itemArray[0]['province']
	  			this.data.price = this.itemArray[0]['price']
	  			this.data.comment = this.itemArray[0]['comment']
	  			this.data.email = this.itemArray[0]['email']
	  		}
  		})
  		console.log(this.itemArray[0]);
		})
	
  }

  ngOnInit() {
  	console.log(this.id['id']) // Print Id Individual
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