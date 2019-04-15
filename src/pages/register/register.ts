import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {
  username:string;
  password:string;
  repass:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private fire: AngularFireAuth, private alertCtrl: AlertController) {
    
  }


  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }


  ionViewDidLoad() {
    console.log('goto RegisterPage');
  }
  register(){
    var errors = 0;
    if(this.username.length < 7){
      errors++;
      this.alert("Username too short");
    }
    if(this.password.length < 7){
      errors++;
      this.alert("Password too short");
    }
    if(this.username.length == 0 || this.password.length == 0 || this.repass.length == 0){
      errors++;
      this.alert("Please fill all fields");
    }
    if(this.password != this.repass){
      errors++;
      this.alert("Passwords are different");
    }
    if(errors == 0){
      this.fire.auth.createUserWithEmailAndPassword(this.username, this.password).then((data) => {
        console.log("User "+this.username+" registered with password "+this.password);
        this.alert("You have registered successfully!");
        this.fire.auth.currentUser.sendEmailVerification();
        this.navCtrl.push(HomePage);
      })
      .catch(error => {
        console.log("Some error");
        this.alert(error.message);
        this.navCtrl.push(HomePage);
      });
    }
  }
}