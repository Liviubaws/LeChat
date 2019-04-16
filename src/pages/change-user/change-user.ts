import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { GeneralPage } from '../general/general';

/**
 * Generated class for the ChangeUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-user',
  templateUrl: 'change-user.html',
})
export class ChangeUserPage {
newuser:string;
users = [];
currentUser: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl: AlertController,) {
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
    console.log('ionViewDidLoad ChangeUserPage');
  }
  changeUser(){
    if(this.newuser.length < 7){
      this.alert("Username too short. Need at least 8 characters");
      this.navCtrl.push(GeneralPage);
    }
    else{
      var index = -1;
      for(var i = 0; i < this.users.length; i++){
        if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email){
          this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
          index = i;
          break;
        }
      }
      var data:string;
      data = this.fire.auth.currentUser.email;
      data = data.concat(this.newuser);
      if(index > - 1){
        this.users[index].$value = data;
        this.fdb.list("/users/").remove(this.users[index].$key);
        this.fdb.list("/users/").push(data);
        this.alert("Username changed succesfully");
        this.fire.auth.signOut();
        this.navCtrl.push(HomePage);
      }
      else{
        this.alert("Something went wrong");
        this.navCtrl.push(GeneralPage);
      }
    }
  }
}
