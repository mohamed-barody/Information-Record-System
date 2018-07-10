import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

	data = {
	    name : '',
	    phone : '',
	    skill : '',
	    province : '',
	    price : '',
	    comment: ''
	};

  	itemList: AngularFireList<any>;
    itemArray = []

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

  moreinfo(key){
    this.router.navigate(['info/'+key])
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
}