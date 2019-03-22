import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {
  
  
  username:string;
  password:string;
  repass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: Storage) {
  }

  ionViewDidLoad() {
    console.log('goto RegisterPage');
  }
  register(){
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
    this.database.get(this.username).then((result) => {
      if(result != null){
        errors++;
        alert("Username is already taken");
      }
      else{
        if(errors == 0){
          this.database.set(this.username, this.password);
          console.log("User "+this.username+" registered with password "+this.password);
          alert("Registered succesfully, please log in");
          this.navCtrl.push(HomePage);
        }
      }
    });
    
  }
  
}