import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  friend:string;
  data:string;
  friends = [];
  notifications = [];
  users = [];
  notification:string;
  index;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public fdb: AngularFireDatabase,
    public fire:AngularFireAuth) {
    this.fdb.list("/friends/").subscribe(__friends => {
      this.friends = __friends;
    });
    this.fdb.list("/notifications/").subscribe(__notifications => {
      this.notifications = __notifications;
    });
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
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
    console.log('ionViewDidLoad AddPage');
  }
  add(){
    var errors = 0;
    var found = 0;
    var currentUser:string;
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.substring(0,this.fire.auth.currentUser.email.length) == this.fire.auth.currentUser.email){
        currentUser = this.users[i].$value.substring(this.fire.auth.currentUser.email.length, this.users[i].$value.length);
      }
    }
    if(this.friend == currentUser){
      errors++;
      this.alert("You cannot add yourself");
      this.navCtrl.push(GeneralPage);
    }
    for(var i = 0; i < this.users.length; i++){
      console.log(this.users[i].$value);
      if(this.users[i].$value.lastIndexOf(this.friend) + this.friend.length == this.users[i].$value.length){
        found = 1;
        break;
      }
    }
    if(found == 0){
      errors++;
      this.alert("That username doesn't exist");
      this.navCtrl.push(GeneralPage);
    }
    else{
      if(errors == 0){
        this.index = -1;
        this.data = "";
        this.data = this.data.concat(currentUser);
        this.data = this.data.concat(this.friend);
        for(var i = 0; i < this.friends.length; i++){
          if(this.friends[i].$value == this.data){
            this.index = i;
          }
        }
        if(this.index > -1){
          this.alert("You are already friends with that user");
          this.navCtrl.push(GeneralPage);
        }
        else{
          this.alert("You added "+this.friend);
          this.notification = "";
          this.notification = this.notification.concat(currentUser);
          this.notification = this.notification.concat(" has added ");
          this.notification = this.notification.concat(this.friend);
          this.fdb.list("/friends/").push(this.data);
          this.fdb.list("/notifications").push(this.notification);
          this.navCtrl.push(GeneralPage);
        } 
      }
    }
  }

}