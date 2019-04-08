import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications = [];
  toshow = [];
  helper1:string;
  helper2:string;
  helper3:string;
  who:string;
  sub;
  toRemove: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb: AngularFireDatabase,
    public fire: AngularFireAuth) {
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.sub = Observable.interval(100)
    .subscribe((val) => { this.notif(); });
  }
  notif(){
    if(this.fire.auth.currentUser == null){
      this.sub.unsubscribe();
    }
    else{
      this.helper1 = " has added ";
      this.helper2 = " has removed ";
      this.helper3 = " sent a message to "
      for(var i = 0; i < this.notifications.length; i++){
        if(this.notifications[i].$value.substring(this.notifications[i].$value.length - this.fire.auth.currentUser.email.length, this.notifications[i].$value.length) == this.fire.auth.currentUser.email){
          this.who = "";
          if(this.notifications[i].$value.search(this.helper1) != -1){
            this.who = this.who.concat(this.notifications[i].$value.substr(0, this.notifications[i].$value.length - this.helper1.length - this.fire.auth.currentUser.email.length));
            this.who = this.who.concat(" added you as a friend");
            this.toshow.push(this.who);
            this.fdb.list("/notifications").remove(this.notifications[i].$key);
            if(this.notifications[i] == null){
              break;
            }
          }
          if(this.notifications[i].$value.search(this.helper2) != -1){
            this.who = this.who.concat(this.notifications[i].$value.substr(0, this.notifications[i].$value.length - this.helper2.length - this.fire.auth.currentUser.email.length));
            this.who = this.who.concat(" removed you as a friend");
            this.toshow.push(this.who);
            this.fdb.list("/notifications").remove(this.notifications[i].$key);
            if(this.notifications[i] == null){
              break;
            }
          }
          if(this.notifications[i].$value.search(this.helper3) != -1){
            this.who = this.who.concat(this.notifications[i].$value.substr(0, this.notifications[i].$value.length - this.helper3.length - this.fire.auth.currentUser.email.length));
            this.who = this.who.concat(" sent you a message");
            this.toshow.push(this.who);
            this.fdb.list("/notifications").remove(this.notifications[i].$key);
            if(this.notifications[i] == null){
              break;
            }
          } 
        }
      }
    }
  }
  stop(){
    for(var i = 0; i < this.toshow.length;i++){
      this.toshow.pop();
    }
    this.sub.unsubscribe();
  }
}
