import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { GeneralPage } from '../general/general';
/**
 * Generated class for the RemovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remove',
  templateUrl: 'remove.html',
})
export class RemovePage {
  friend:string;
  data:string;
  index;
  friends = [];
  notifications = [];
  myfriends = [];
  checked = [];
  toShow:string;
  fr = [];
  users = [];
  helper:string;
  notification:string;
  currentUser:string;
  logged:boolean;
  sub;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fire: AngularFireAuth, public fdb: AngularFireDatabase) {
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
    });
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
    for(var i = 0; i < 1000; i++){
      this.checked[i] = 0;
    }
  }
  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RemovePage');
    this.sub = Observable.interval(1000)
    .subscribe((val) => { this.friendsShow(); });
  }
  friendsShow(){
    if(this.fire.auth.currentUser == null){
      this.sub.unsubscribe();
    }
    else{
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email){
        this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
      }
    }
    for(i = 0; i < this.friends.length; i++){
        if(this.friends[i].$value.substring(0, this.currentUser.length) == this.currentUser && this.checked[i] == 0){
          this.toShow = this.friends[i].$value.substring(this.currentUser.length, this.friends[i].$value.length);
          this.fr.push(this.toShow);
          this.checked[i] = 1;
        }
      }
    }
  }
  remove(i){
    if( i > -1){
      var index = -1;
      this.friend = this.fr[i];
      this.helper = "";
      this.helper = this.helper.concat(this.currentUser);
      this.helper = this.helper.concat(this.friend);
      for(var j = 0; j < this.friends.length; j++){
        if(this.friends[j].$value == this.helper){
          index = j;
          break;
        }
      }
      if(index != -1){
        this.fr.splice(i, 1);
        this.fdb.list("/friends/").remove(this.friends[index].$key);
        this.notification = "";
        this.notification = this.notification.concat(this.currentUser);
        this.notification = this.notification.concat(" has removed ");
        this.notification = this.notification.concat(this.friend);
        this.fdb.list("/notifications").push(this.notification);
        this.alert(this.friend + " is no longer your friend");
        this.navCtrl.push(GeneralPage);
      }
      else{
        this.alert("Something went wrong");
        this.navCtrl.push(GeneralPage);
      }
      
    }
  }
}
