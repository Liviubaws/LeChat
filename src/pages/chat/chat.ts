import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GeneralPage } from '../general/general';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export var msjCheck:number[] = new Array(1000);

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  chats = [];
  friends = [];
  recvm:string;
  recvmCopy:string;
  recvmCpy:string;
  mymsj = [];
  sentmsj = [];
  checker:string;
  helper:string;
  message:string;
  mdata:string;
  mhelper:string;
  data:string;
  friend:string;
  friendCheck:string;
  toShow:string;
  showSent:string;
  toRemove:string;
  notifications = [];
  notification:string;
  sub;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl:AlertController) {
    this.fdb.list("/chat/").valueChanges().subscribe(__chat => {
      this.chats = __chat;
    });
    this.fdb.list("/friends/").valueChanges().subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").valueChanges().subscribe(__notifications => {
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
    console.log('ionViewDidLoad ChatPage');
    this.sub = Observable.interval(1000)
    .subscribe((val) => { this.chatShow(); });
  }

  chatSend(){
    var errors = 0;
    if(this.friend == this.fire.auth.currentUser.email){
      this.alert("You cannot send a message to yourself");
      this.navCtrl.push(GeneralPage);
      this.stop();
    }
    this.fire.auth.fetchSignInMethodsForEmail(this.friend).then(result => {
      if(result.length == 0){
        errors = 1;
        this.alert("That username doesn't exist");
        this.navCtrl.push(GeneralPage);
        this.stop();
      }
      else{
        if(errors == 0){
          this.data = "";
          this.mhelper = "";
          this.showSent = "";
          this.showSent = this.showSent.concat("Message to ");
          this.showSent = this.showSent.concat(this.friend);
          this.showSent = this.showSent.concat(": ");
          this.data = this.data.concat(this.fire.auth.currentUser.email);
          this.data = this.data.concat(this.friend);
          this.mhelper = this.mhelper.concat(this.data);
          if(this.friends.indexOf(this.data) >= 0){
            this.mhelper = this.message.concat(this.mhelper);
            this.showSent = this.showSent.concat(this.message);
            this.notification = "";
            this.notification = this.notification.concat(this.fire.auth.currentUser.email);
            this.notification = this.notification.concat(" sent a message to ");
            this.notification = this.notification.concat(this.friend);
            this.sentmsj.push(this.showSent);
            this.fdb.list("/notifications").push(this.notification);
            this.fdb.list("/chat/").push(this.mhelper);
          }
          else{
            this.alert("You are not friend with "+this.friend);
            this.navCtrl.push(GeneralPage);
            this.stop();
          } 
        }
      }
    });
  }

  stop(){
    this.sub.unsubscribe();
    for(var i=0;i<this.mymsj.length;i++){
      this.mymsj.pop();
    }
  }
  chatShow(){
   if(this.fire.auth.currentUser == null){
     this.sub.unsubscribe();
   }
   else{
      for(var i = 0; i < this.friends.length; i++){
        for(var j = 0; j < this.chats.length; j++){
          this.checker = this.friends[i];
          this.recvm = this.chats[j];
          this.recvmCopy = this.recvm;
          this.recvmCpy = this.recvm;
          this.helper = this.fire.auth.currentUser.email;
          this.friendCheck = this.friends[i].substr(this.helper.length);
          if(this.helper== this.checker.substring(0, this.helper.length) && this.recvm.substring(this.recvm.length - this.helper.length, this.recvm.length) == this.helper &&
          this.recvmCpy.substring(this.recvm.length - this.helper.length - this.friendCheck.length, this.recvm.length - this.helper.length) == this.friendCheck){
            this.recvmCopy = this.recvmCopy.substring(0, this.recvmCopy.length - this.friendCheck.length - this.helper.length);
            this.toShow = "";
            this.toShow = this.toShow.concat("Message from ");
            this.toShow = this.toShow.concat(this.friendCheck);
            this.toShow = this.toShow.concat(": ")
            this.toShow = this.toShow.concat(this.recvmCopy);
            this.mymsj.push(this.toShow);
            this.toRemove = this.chats[j];
            this.fdb.list("/chat").remove(this.chats[this.chats.indexOf(this.toRemove)].$key);
            this.chats.splice(j, 1);
          }
        }
      } 
    }
  }
}