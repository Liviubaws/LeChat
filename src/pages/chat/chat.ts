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
  notifications = [];
  notification:string;
  checked = [];
  fr = [];
  index;
  sub;
  subfriends;
  currentUser:string;
  users = [];
  test;
  chk;
  chk2;
  toggled: boolean = false;
  statuses = [];
  frarr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl:AlertController) {
    this.fdb.list("/chat/").subscribe(__chat => {
      this.chats = __chat;
    });
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
    });
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
    this.fdb.list("/statuses/").subscribe(__statuses => {
      this.statuses = __statuses;
    });
    for(var i = 0; i < 1000; i++){
      this.checked[i] = 0;
    }
    this.test = 0;
    this.chk = 0;
    this.chk2 = 0;
    this.message = "";
  }

  handleSelection(event) {
    this.message = this.message.concat(event.char);
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
    this.subfriends = Observable.interval(1000)
    .subscribe((val) => { this.friendsShow(); });
  }

  friendsShow(){
    if(this.fire.auth.currentUser == null){
      this.sub.unsubscribe();
    }
    else{
      for(var i = 0; i < this.users.length; i++){
        if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email && this.test == 0){
          this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
          this.test = 1;
          break;
        }
      }
      for(i = 0; i < this.friends.length; i++){
        if(this.friends[i].$value.substring(0, this.currentUser.length) == this.currentUser && this.checked[i] == 0){
          this.toShow = this.friends[i].$value.substring(this.currentUser.length, this.friends[i].$value.length);
          this.frarr.push(this.toShow);
          for(var j = 0; j < this.statuses.length; j++){
            if(this.toShow == this.statuses[j].$value.substring(0, this.toShow.length)){
              this.toShow = this.toShow.concat(" --- ");
              this.toShow = this.toShow.concat(this.statuses[j].$value.substring(this.toShow.length - 5, this.statuses[j].$value.length));
            }
          }
          this.fr.push(this.toShow);
          this.checked[i] = 1;
        }
      }
    }
  }
  choose(i){
      this.friend = this.frarr[i];
  }
  chatSend(){
    var errors = 0;
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email && this.chk == 0){
        this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
        this.chk = 1;
        break;
      }
    }
    if(this.friend == this.currentUser){
      this.alert("You cannot send a message to yourself");
      errors++;
      this.navCtrl.push(GeneralPage);
      this.stop();
    }
    if(this.friend == null){
      this.alert("Please provide an user to send the message to");
      errors++;
      this.navCtrl.push(GeneralPage);
      this.stop();
    }
    if(this.message == ""){
      errors++;
      this.alert("You cannot send an empty message");
      this.navCtrl.push(GeneralPage);
      this.stop();
    }
    else{
      if(errors == 0){
        this.index = -1;
        this.data = "";
        this.mhelper = "";
        this.showSent = "";
        this.showSent = this.showSent.concat("Message to ");
        this.showSent = this.showSent.concat(this.friend);
        this.showSent = this.showSent.concat(": ");
        this.data = this.data.concat(this.currentUser);
        this.data = this.data.concat(this.friend);
        this.mhelper = this.mhelper.concat(this.data);
        for(i = 0; i < this.friends.length; i++){
          if(this.friends[i].$value == this.data){
            this.index = i;
          }
        }
        if(this.index > -1){
          this.mhelper = this.message.concat(this.mhelper);
          this.showSent = this.showSent.concat(this.message);
          this.notification = "";
          this.notification = this.notification.concat(this.currentUser);
          this.notification = this.notification.concat(" sent a message to ");
          this.notification = this.notification.concat(this.friend);
          this.sentmsj.push(this.showSent);
          this.fdb.list("/notifications").push(this.notification);
          this.fdb.list("/chat/").push(this.mhelper);
        }
        else{
          this.alert("That user is not your friend");
          this.navCtrl.push(GeneralPage);
          this.stop();
        } 
      }
    }
  }

  stop(){
    this.sub.unsubscribe();
    this.subfriends.unsubscribe();
    for(var i=0;i<this.mymsj.length;i++){
      this.mymsj.pop();
    }
  }
  chatShow(){
   if(this.fire.auth.currentUser == null){
     this.sub.unsubscribe();
   }
   else{
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email && this.chk2 == 0){
        this.currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
        this.chk2 = 1;
        break;
      }
    }
    for(i = 0; i < this.friends.length; i++){
      for(var j = 0; j < this.chats.length; j++){
        this.checker = this.friends[i].$value;
        this.recvm = this.chats[j].$value;
        this.recvmCopy = this.recvm;
        this.recvmCpy = this.recvm;
        this.helper = this.currentUser;
        this.friendCheck = this.friends[i].$value.substring(this.helper.length, this.friends[i].$value.length);
        if(this.helper== this.checker.substring(0, this.helper.length) && this.recvm.substring(this.recvm.length - this.helper.length, this.recvm.length) == this.helper &&
        this.recvmCpy.substring(this.recvm.length - this.helper.length - this.friendCheck.length, this.recvm.length - this.helper.length) == this.friendCheck){
          this.recvmCopy = this.recvmCopy.substring(0, this.recvmCopy.length - this.friendCheck.length - this.helper.length);
          this.toShow = "";
          this.toShow = this.toShow.concat("Message from ");
          this.toShow = this.toShow.concat(this.friendCheck);
          this.toShow = this.toShow.concat(": ")
          this.toShow = this.toShow.concat(this.recvmCopy);
          this.mymsj.push(this.toShow);
          console.log(this.toShow);
          this.fdb.list("/chat").remove(this.chats[j].$key);
        }
      }
    }
    }
  }
  
}