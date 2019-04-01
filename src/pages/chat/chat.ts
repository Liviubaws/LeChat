import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export default class ChatPage {
chats = [];
friends = [];
messages = [];
recvm:string;
recvmCopy:string;
currFriend:string;
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
toRemove:string;
sub;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl:AlertController) {
    this.fdb.list("/chat/").valueChanges().subscribe(__chat => {
      this.chats = __chat;
    });
    this.fdb.list("/friends/").valueChanges().subscribe(__friends => {
      this.friends = __friends;
    });
    for(var i = 0;i < this.chats.length; i++){
      msjCheck[i] = 0;
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
    console.log('ionViewDidLoad ChatPage');
    this.sub = Observable.interval(100)
    .subscribe((val) => { this.chatShow(); });
  }

  chatSend(){
    var errors = 0;
    if(this.friend == this.fire.auth.currentUser.email){
      this.alert("You cannot send a message to yourself");
      this.navCtrl.push(GeneralPage);
      this.chatRelease();
    }
    this.fire.auth.fetchSignInMethodsForEmail(this.friend).then(result => {
      if(result.length == 0){
        errors = 1;
        this.alert("That username doesn't exist");
        this.navCtrl.push(GeneralPage);
        this.chatRelease();
      }
      else{
        if(errors == 0){
          this.data = "";
          this.mhelper = "";
          this.data = this.data.concat(this.fire.auth.currentUser.email);
          this.data = this.data.concat(this.friend);
          this.mhelper = this.mhelper.concat(this.data);
          if(this.friends.indexOf(this.data) >= 0){
            this.mhelper = this.message.concat(this.mhelper);
            this.sentmsj.push(this.mhelper);
            this.fdb.list("/chat/").push(this.mhelper);
          }
          else{
            this.alert("You are not friend with "+this.friend);
            this.navCtrl.push(GeneralPage);
            this.chatRelease();
          } 
        }
      }
    });
  }

  stop(){
    this.sub.unsubscribe();
  }
  chatShow(){
   if(this.fire.auth.currentUser == null){
     this.sub.unsubscribe();
   }
   else{
      this.helper = this.fire.auth.currentUser.email;
      for(var i = 0; i < this.friends.length; i++){
        for(var j = 0; j < this.chats.length; j++){
          if(msjCheck[j] != 1){
            this.checker = "";
            this.recvmCopy = "";
            this.recvm = "";
            this.currFriend = "";
            this.friendCheck = "";
            this.toShow = "Message from ";
            this.recvm = this.chats[j];
            this.currFriend = this.friends[i];
            this.friendCheck = this.currFriend.substr(this.fire.auth.currentUser.email.length, this.currFriend.length);
            this.toShow = this.toShow.concat(this.friendCheck);
            this.checker = this.friendCheck.concat(this.helper);
            if(this.recvm.substr(this.recvm.length - this.friendCheck.length - this.helper.length, this.recvm.length) == this.checker){
              this.recvmCopy = this.chats[j];
              this.recvmCopy = this.recvmCopy.substr(0, this.recvmCopy.length - this.friendCheck.length - this.helper.length);
              this.toShow = this.toShow.concat(": ")
              this.toShow = this.toShow.concat(this.recvmCopy);
              this.mymsj.push(this.toShow);
              msjCheck[j] = 1;
            }
          }
          if(msjCheck[j] == 1){
            this.toRemove = this.chats[j];
            this.fdb.list("/chat").remove(this.chats[this.chats.indexOf(this.toRemove)].$key);
          }
        }
      }
    }
  }


  chatRelease(){
    for(var i=0;i<this.mymsj.length;i++){
      this.mymsj.pop();
    }
  }

}