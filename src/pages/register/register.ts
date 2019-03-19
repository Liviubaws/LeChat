import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export var usernames = new Array(50);
export var passwords = new Array(50);

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {
  
  
  username:string;
  password:string;
  repass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('goto RegisterPage');
  }
  register(){
    var i;
    var errors = 0;
    if(this.username.length < 7){
      errors++;
      alert("Username too short");
    }
    if(this.password.length < 7){
      errors++;
      alert("Password too short");
    }
    if(this.username.length == 0 || this.password.length == 0 || this.repass.length == 0){
      errors++;
      alert("Please fill all fields");
    }
    if(this.password != this.repass){
      errors++;
      alert("Passwords are different");
    }
    for(i in usernames){
      if(this.username == usernames[i]){
        errors++;
        alert("Username is already taken");
      }
    }
    if(errors == 0){
      usernames.push(this.username);
      passwords.push(this.password);
      console.log("User "+this.username+" registered with password "+this.password);
      alert("Registered succesfully, please log in");
      this.navCtrl.push(HomePage);
    }
  }
  
}