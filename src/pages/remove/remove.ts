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
  notification:string;
  sub;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fire: AngularFireAuth, public fdb: AngularFireDatabase) {
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
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
      for(var i = 0; i < this.friends.length; i++){
        if(this.friends[i].$value.substring(0, this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email && this.checked[i] == 0){
          this.toShow = this.friends[i].$value.substring(this.fire.auth.currentUser.email.length, this.friends[i].$value.length);
          this.fr.push(this.toShow);
          this.checked[i] = 1;
        }
      }
    }
  }
  remove(i){
    if( i > -1){
      this.friend = this.fr[i];
      this.fr.splice(i, 1);
      this.fdb.list("/friends/").remove(this.friends[i].$key);
      this.notification = "";
      this.notification = this.notification.concat(this.fire.auth.currentUser.email);
      this.notification = this.notification.concat(" has removed ");
      this.notification = this.notification.concat(this.friend);
      this.fdb.list("/notifications").push(this.notification);
      this.alert(this.friend + " is no longer your friend");
      this.navCtrl.push(GeneralPage);
    }
    
    /*this.index = -1;
    this.data = "";
    this.data = this.data.concat(this.fire.auth.currentUser.email);
    this.data = this.data.concat(this.friend);
    for(var i = 0; i < this.friends.length; i++){
      if(this.friends[i].$value == this.data){
        this.index = i;
      }
    }
    if(this.index == -1){
      this.alert("That user is not your friend");
      this.navCtrl.push(GeneralPage);
    }
    else{
      this.fdb.list("/friends/").remove(this.friends[this.index].$key);
      this.notification = "";
      this.notification = this.notification.concat(this.fire.auth.currentUser.email);
      this.notification = this.notification.concat(" has removed ");
      this.notification = this.notification.concat(this.friend);
      this.fdb.list("/notifications").push(this.notification);
      this.alert(this.friend + " is no longer your friend");
      this.navCtrl.push(GeneralPage);
    }*/
  }
}
