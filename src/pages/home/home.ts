import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage} from '../register/register';
import { GeneralPage } from '../general/general';
import { ForgotPage} from '../forgot/forgot';
import { Storage} from '@ionic/storage';


export var currentUser:string;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public database:Storage){
  }

  login(){
    /*var i = 0;
    var logged = 0;
    for(i = 0; i < usernames.length; i++){
      if(this.username == usernames[i] && this.password == passwords[i]){
        console.log("User "+this.username+" has logged in succesfully with the password "+this.password);
        currentUser = this.username;
        alert("Login succesfully");
        logged = 1;
        this.navCtrl.push(GeneralPage);
      }
    }*/

    this.database.get(this.username).then((result) => {
      if((result == null) || (result != this.password)){
        alert("Username or password is wrong");
      }
      else{
        if(result == this.password){
          alert("Logged in");
          console.log("User "+this.username+" has logged in succesfully with the password "+this.password);
          currentUser = this.username;
          this.navCtrl.push(GeneralPage);
        }
      }
    });
  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  forgot(){
    this.navCtrl.push(ForgotPage);
  }
}
