import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage, usernames, passwords  } from '../register/register';
import { GeneralPage } from '../general/general';

export var currentUser:string;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  username:string;
  password:string;

  constructor(public navCtrl: NavController){

  }

  login(){
    var i = 0;
    var logged = 0;
    for(i = 0; i < usernames.length; i++){
      if(this.username == usernames[i] && this.password == passwords[i]){
        console.log("User "+this.username+" has logged in succesfully with the password "+this.password);
        currentUser = this.username;
        alert("Login succesfully");
        logged = 1;
        this.navCtrl.push(GeneralPage);
      }
    }
    if(logged == 0){
      alert("Username or password are wrong");
    }
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  addFriend(){
    
  }
}
