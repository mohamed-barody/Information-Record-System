import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router'
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

email: string;
uid: string;
id: any;
myid: string;
userKey: any;
imageURL: string;
data = {
    name : '',
    phone : '',
    age : '',
    address : '',
    city : '',
    job: '',
    email: '',
    image: ''
};
itemList: AngularFireList<any>
itemArray = []

ref: AngularFireStorageReference;
task: AngularFireUploadTask;
downloadURL :Observable<any>;


  constructor(private afStorage: AngularFireStorage, public db:AngularFireDatabase, public rout: Router) { 
  	this.email = localStorage.getItem('email')
  	this.myid = localStorage.getItem('uid')

  	this.itemList = db.list('users')

  	this.itemList.snapshotChanges()
  	.subscribe(actions=>{
  		actions.forEach(action=>{
	  		let y = action.payload.toJSON()
	  		y['$key'] = action.key
	  		this.itemArray.push(y as ListItemClass)
	  		if(action.payload.child('uid').val() == this.myid) {
          this.userKey = action.key
	  			this.itemArray.push(y as ListItemClass)
	  			this.data.name = this.itemArray[0]['name']
	  			this.data.phone = this.itemArray[0]['phone']
	  			this.data.age = this.itemArray[0]['age']
	  			this.data.address = this.itemArray[0]['address']
	  			this.data.city = this.itemArray[0]['city']
	  			this.data.job = this.itemArray[0]['job']
          this.data.email = this.itemArray[0]['email']
          this.data.image = this.itemArray[0]['image']

           console.log(this.userKey);
           console.log(this.itemArray)
           console.log(this.data)


	  		}
  		})
	})
   
  }

  ngOnInit() {
  	console.log(this.email)
  	console.log(this.myid)
  }

  upload(event){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    console.log("image is uploaded")
    this.task.snapshotChanges().pipe(
    finalize(() => {
      this.downloadURL = this.ref.getDownloadURL()
      this.downloadURL.subscribe(url => {
        if (url) {
          this.imageURL = url
        }
        console.log(this.imageURL)
        this.itemList.set(this.userKey , {
        name : this.data.name,
        phone : this.data.phone,
        age : this.data.age,
        address : this.data.address,
        city : this.data.city,
        job : this.data.job,
        email: this.email,
        uid: this.myid,
        image: this.imageURL
      })
      })
    })
  )
  .subscribe();
  }

  onEdit(){
    this.itemList.set(this.userKey , {
      name : this.data.name,
      phone : this.data.phone,
      age : this.data.age,
      address : this.data.address,
      city : this.data.city,
      job : this.data.job,
      email: this.email,
      uid: this.myid
    })
    this.rout.navigate(['/home']);
  }

}

export class ListItemClass {
	  name : string;
  	phone : string;
  	age : string;
	  address: string;
  	city: string;
    job: string;
    email: string;
}
