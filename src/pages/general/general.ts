import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { HomePage} from '../home/home';
import { AddPage } from '../add/add';
import { NotificationsPage } from '../notifications/notifications';
import { RemovePage } from '../remove/remove';
import { ChatPage} from '../chat/chat';
import { ChangePassPage} from '../change-pass/change-pass';
import { AngularFireAuth} from 'angularfire2/auth';
import { ChangeUserPage } from '../change-user/change-user';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the GeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})


export class GeneralPage {
  greeted: string;
  user: string;
  currentStatus: string;
  status: string;
  submitStatus: string;
  users = [];
  friends = [];
  profiles = [];
  statuses = [];
  notifs = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private fire: AngularFireAuth, private fdb: AngularFireDatabase) {
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/profiles/").subscribe(__profiles => {
      this.profiles = __profiles;
    });
    this.fdb.list("/statuses/").subscribe(__statuses => {
      this.statuses = __statuses;
    });
    this.fdb.list("/notifications/").subscribe(__notifs => {
      this.notifs = __notifs;
    });
    this.user = "";
    this.currentStatus = "not set";
    this.greeted = this.fire.auth.currentUser.email;
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0, this.greeted.length) == this.greeted){
        this.user = this.users[i].$value.substring(this.greeted.length);
        break;
      }
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
    console.log('ionViewDidLoad GeneralPage');
  }
  addFriend() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Friends',
      buttons: [
        {
          text: 'Add friend',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(AddPage);
            console.log('Add clicked');
          }
        },{
          text: 'Remove friend',
          icon: 'backspace',
          handler: () => {
            this.navCtrl.push(RemovePage);
            console.log('Remove clicked');
          }
        },{
          text: 'Cancel',
          role: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  account() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Account',
      buttons: [
        {
          text: 'Delete account',
          icon: 'close-circle',
          handler: () => {
            this.delAcc();
          }
        },
        {
          text: 'Change password',
          icon: 'construct',
          handler: () => {
            console.log('Going to change password for '+this.fire.auth.currentUser.email);
            this.navCtrl.push(ChangePassPage);
          }
        },
        {
          text: 'Change username',
          icon: 'construct',
          handler: () => {
            console.log('Going to change username for '+this.fire.auth.currentUser.email);
            this.navCtrl.push(ChangeUserPage);
          }
        },{
          text: 'Cancel',
          role: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  delAcc(){
            for(var i = 0; i < this.users.length; i++){
              if(this.user == this.users[i].$value.substring(this.users[i].$value.length - this.user.length, this.users[i].$value.length)){
                this.fdb.list("/users/").remove(this.users[i].$key);
              }
            }
            for(var i = 0; i < this.friends.length; i++){
              if(this.user == this.friends[i].$value.substring(0, this.user.length)){
                this.fdb.list("/friends/").remove(this.friends[i].$key);
                i = 0;
              }
              if(this.user == this.friends[i].$value.substring(this.friends[i].$value.length - this.user.length, this.friends[i].$value.length)){
                this.fdb.list("/friends/").remove(this.friends[i].$key);
                i = 0;
              }
            }
            for(var i = 0; i < this.statuses.length; i++){
              if(this.statuses[i].$value.substring(0, this.user.length) == this.user){
                this.fdb.list("/statuses/").remove(this.statuses[i].$key);
                break;
              }
            }
            for(var i = 0; i < this.notifs.length; i++){
              if(this.notifs[i].$value.substring(0, this.user.length) == this.user){
                this.fdb.list("/notifications/").remove(this.notifs[i].$key);
                i = 0;
              }
              if(this.notifs[i].$value.substring(this.notifs[i].$value.length - this.user.length, this.notifs[i].$value.length) == this.user){
                this.fdb.list("/notifications/").remove(this.notifs[i].$key);
                i = 0;
              }
            }
            this.alert(this.fire.auth.currentUser.email+ " has been deleted");
            console.log('Deleted account '+this.fire.auth.currentUser.email);
            this.fire.auth.currentUser.delete();
            this.navCtrl.push(HomePage);
  }
  chat() {
    this.navCtrl.push(ChatPage);
  }
  notifications(){
    this.navCtrl.push(NotificationsPage);
  }
  logout(){
    this.alert("You logged you");
    this.fire.auth.signOut();
    this.navCtrl.push(HomePage);
  }
  saveStatus(){
    for(var i = 0; i < this.statuses.length; i++){
      if(this.statuses[i].$value.substring(0, this.user.length) == this.user){
        this.fdb.list("/statuses/").remove(this.statuses[i].$key);
        break;
      }
    }
    this.submitStatus = "";
    this.submitStatus = this.user;
    this.submitStatus = this.submitStatus.concat(this.status);
    this.currentStatus = this.status;
    this.fdb.list("/statuses/").push(this.submitStatus);
  }
}
