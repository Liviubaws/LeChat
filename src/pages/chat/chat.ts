import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GeneralPage } from '../general/general';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

chats = [];
friends = [];
messages = [];
recvm = [];
recvmcopy = [];
mymsj = [];
sentmsj = [];
checker:string;
helper:string;
message:string;
mdata:string;
mhelper:string;
data:string;
friend:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb:AngularFireDatabase, public fire:AngularFireAuth,
    public alertCtrl:AlertController) {
    this.fdb.list("/chat/").valueChanges().subscribe(__chat => {
      this.chats = __chat;
    });
    this.fdb.list("/friends/").valueChanges().subscribe(__friends => {
      this.friends = __friends;
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
    this.chatShow();
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


  chatShow(){
    var i=0;
      this.recvm=this.chats;
      this.recvmcopy = this.recvm;
      this.mymsj=this.chats;
      this.mdata = "";
      this.helper = "";
      this.checker = "";
      this.mdata = this.mdata.concat(this.fire.auth.currentUser.email);
      this.mdata = this.mdata.concat(this.friend);
      this.helper = this.helper.concat(this.friend);
      this.checker = this.checker.concat(this.fire.auth.currentUser.email);
      for(i=0;i<this.recvm.length;i++){
        if((this.mdata = this.recvmcopy[i].substr(this.recvmcopy[i].length-this.mdata.length,this.recvmcopy[i].length)) &&
        (this.helper == this.recvmcopy[i].substr(this.recvmcopy[i].length-this.mdata.length+this.checker.length, this.recvmcopy[i].length))){
          this.recvm[i]=this.recvm[i].substring(0,this.recvmcopy[i].length-this.mdata.length);
          this.mymsj.push(this.recvm[i]);
        }
      }
  }


  chatRelease(){
    for(var i=0;i<this.mymsj.length;i++){
      this.mymsj.pop();
    }
  }

}