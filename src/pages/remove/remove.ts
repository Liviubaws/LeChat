import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
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
  notification:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fire: AngularFireAuth, public fdb: AngularFireDatabase) {
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
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
    console.log('ionViewDidLoad RemovePage');
  }
  remove(){
    this.index = -1;
    this.data = "";
    this.data = this.data.concat(this.fire.auth.currentUser.email);
    this.data = this.data.concat(this.friend);
    console.log(this.friends);
    console.log(this.data);
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
    }
  }
}

//Se sterg toate notificarile cand vad de la un user
//Se sterg toate prieteniile cand sterg de la un user