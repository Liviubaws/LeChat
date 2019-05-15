import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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
greeted:string;
user:string;
replace:string;
friends = [];
users = [];
currentUser: string;
notifs = [];
statuses = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl: AlertController,) {
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifs => {
      this.notifs = __notifs;
    });
    this.fdb.list("/statuses/").subscribe(__statuses => {
      this.statuses = __statuses;
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
  /*changeUser(){
    if(this.newuser.length < 7){
      this.alert("Username too short. Need at least 8 characters");
      this.navCtrl.push(GeneralPage);
    }
    else{
      this.greeted = this.fire.auth.currentUser.email;
      for(var i = 0; i < this.users.length; i++){
        if(this.users[i].$value.substring(0, this.greeted.length) == this.greeted){
          this.user = this.users[i].$value.substring(this.greeted.length);
          break;
        }
      }
      var index = -1;
      for(var i = 0; i < this.users.length; i++){
        if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email){
          this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
          index = i;
          break;
        }
      }
      for(var i = 0; i < this.friends.length; i++){
        if(this.user == this.friends[i].$value.substring(0, this.users.length)){
          this.replace = "";
          this.replace = this.replace.concat(this.newuser);
          this.replace = this.replace.concat(this.friends[i].$value.substring(this.friends[i].$value.length - this.user.length, this.friends[i].$value.length));
          
          this.fdb.list("/friends/").remove(this.friends[i].$key);
          this.fdb.list("/friends/").push(this.replace);
          i = 0;
        }
        if(this.user == this.friends[i].$value.substring(this.friends[i].$value.length - this.user.length, this.friends[i].$value.length)){
          this.replace = "";
          this.replace = this.replace.concat(this.friends[i].$value.substring(0, this.friends[i].$value.length - this.user.length));
          this.replace = this.replace.concat(this.newuser);
          
          this.fdb.list("/friends/").remove(this.friends[i].$key);
          this.fdb.list("/friends/").push(this.replace);
          i = 0;
        }
        for(var i = 0; i < this.notifs.length; i++){
          if(this.user == this.notifs[i].$value.substring(0, this.user.length)){
            this.replace = "";
            this.replace = this.replace.concat(this.newuser);
            this.replace = this.replace.concat(this.notifs[i].$value.substring(this.notifs[i].$value.length - this.user.length, this.notifs[i].$value.length));

            this.fdb.list("/notifications/").remove(this.notifs[i].$key);
            this.fdb.list("/notifications/").push(this.replace);
            i = 0;
          }
          if(this.user == this.notifs[i].$value.substring(this.notifs[i].$value.length - this.user.length, this.notifs[i].$value.length)){
            this.replace = "";
            this.replace = this.replace.concat(this.notifs[i].$value.substring(0, this.notifs[i].$value.length - this.user.length));
            this.replace = this.replace.concat(this.newuser);

            this.fdb.list("/notifications/").remove(this.notifs[i].$key);
            this.fdb.list("/notifications/").push(this.replace);
            i = 0;
          }
        }
        for(var i = 0; i < this.statuses.length; i++){
          if(this.user == this.statuses[i].$value.substring(0, this.user.length)){
            this.replace = "";
            this.replace = this.replace.concat(this.newuser);
            this.replace = this.replace.concat(this.statuses[i].$value.substring(this.statuses[i].$value.length - this.user.length, this.statuses[i].$value.length));

            this.fdb.list("/statuses/").remove(this.statuses[i].$key);
            this.fdb.list("/statuses/").push(this.replace);
          }
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
  }*/
  changeUser(){
    this.user = "";
    this.greeted = this.fire.auth.currentUser.email;
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0, this.greeted.length) == this.greeted){
        this.user = this.users[i].$value.substring(this.greeted.length);
        break;
      }
    }
    for(var i = 0; i < this.users.length; i++){
      if(this.user == this.users[i].$value.substring(this.users[i].$value.length - this.user.length, this.users[i].$value.length)){
        this.replace = "";
        this.replace = this.replace.concat(this.fire.auth.currentUser.email);
        this.replace = this.replace.concat(this.newuser);
        this.fdb.list("/users/").remove(this.users[i].$key);
        this.fdb.list("/users").push(this.replace);
      }
    }
    var repeat = 0;
    for(var i = 0; i < this.friends.length; i++){
      if(repeat == 1){
        i = 0;
        repeat = 0;
      }
      if(this.user == this.friends[i].$value.substring(0, this.user.length)){
        this.replace = "";
        this.replace = this.replace.concat(this.newuser);
        this.replace = this.replace.concat(this.friends[i].$value.substring(this.user.length, this.friends[i].$value.length));
        this.fdb.list("/friends/").remove(this.friends[i].$key);
        this.fdb.list("/friends/").push(this.replace);
        repeat = 1;
      }
      if(this.user == this.friends[i].$value.substring(this.friends[i].$value.length - this.user.length, this.friends[i].$value.length)){
        this.replace = "";
        this.replace = this.replace.concat(this.friends[i].$value.substring(0, this.friends[i].$value.length - this.user.length));
        this.replace = this.replace.concat(this.newuser);
        this.fdb.list("/friends/").remove(this.friends[i].$key);
        this.fdb.list("/friends/").push(this.replace);
        repeat = 1;
      }
    }
    for(var i = 0; i < this.statuses.length; i++){
      if(this.statuses[i].$value.substring(0, this.user.length) == this.user){
        this.replace = "";
        this.replace = this.replace.concat(this.newuser);
        this.replace = this.replace.concat(this.statuses[i].$value.substring(this.user.length, this.statuses[i].$value.length));
        this.fdb.list("/statuses/").remove(this.statuses[i].$key);
        this.fdb.list("/statuses/").push(this.replace);
        break;
      }
    }
    var nervi = 0;
    for(var i = 0; i < this.notifs.length; i++){
      if(nervi == 1){
        i = 0;
        nervi = 0;
      }
      if(this.notifs[i].$value.substring(0, this.user.length) == this.user){
        this.replace = "";
        this.replace = this.replace.concat(this.newuser);
        this.replace = this.replace.concat(this.notifs[i].$value.substring(this.user.length, this.notifs[i].$value.length));
        this.fdb.list("/notifications/").remove(this.notifs[i].$key);
        this.fdb.list("/notifications/").push(this.replace);
        nervi = 1;
      }
      if(this.notifs[i].$value.substring(this.notifs[i].$value.length - this.user.length, this.notifs[i].$value.length) == this.user){
        this.replace = "";
        this.replace = this.replace.concat(this.notifs[i].$value.substring(0, this.notifs[i].$value.length - this.user.length));
        this.replace = this.replace.concat(this.newuser);
        this.fdb.list("/notifications/").remove(this.notifs[i].$key);
        this.fdb.list("/notifications/").push(this.replace);
        nervi = 1;
      }
    }
    this.alert("Account name changed successfully");
    this.navCtrl.push(HomePage);
  }
}
