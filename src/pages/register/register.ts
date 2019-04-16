import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
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
  user:string;
  password:string;
  repass:string;
  data:string;
  users = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private fire: AngularFireAuth, private alertCtrl: AlertController,
    public fdb: AngularFireDatabase) {
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
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
    if(this.user.length < 7){
      errors++;
      this.alert("Username too short");
    }
    if(this.username.length < 7){
      errors++;
      this.alert("Email too short");
    }
    if(this.password.length < 7){
      errors++;
      this.alert("Password too short");
    }
    if(this.username.length == 0 || this.password.length == 0 || this.repass.length == 0 || this.user.length == 0){
      errors++;
      this.alert("Please fill all fields");
    }
    if(this.password != this.repass){
      errors++;
      this.alert("Passwords are different");
    }
    for(var i = 0; i < this.users.length; i++){
      if(this.username == this.users[i].$value.substring(0, this.user.length)){
        errors++;
        this.alert("That email address is already in use");
        break;
      }
      if(this.user == this.users[i].$value.substring(this.username.length, this.user.length)){
        errors++;
        this.alert("That username is already in use");
        break;
      }
    }
    if(errors == 0){
      this.fire.auth.createUserWithEmailAndPassword(this.username, this.password).then((data) => {
        console.log("User "+this.username+" registered with password "+this.password);
        this.alert("You have registered successfully!");
        this.fire.auth.currentUser.sendEmailVerification();
        this.data = "";
        this.data = this.data.concat(this.username);
        this.data = this.data.concat(this.user);
        this.fdb.list("/users/").push(this.data);
        this.navCtrl.push(HomePage);
      })
      .catch(error => {
        console.log("Some error");
        this.alert(error.message);
      });
    }
  }
}