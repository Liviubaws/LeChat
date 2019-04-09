import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    if(this.friend == this.fire.auth.currentUser.email){
      this.alert("You cannot add yourself");
      this.navCtrl.push(GeneralPage);
    }
    /*this.fire.auth.fetchSignInMethodsForEmail(this.friend).then(result => {
      if(result.length == 0){
        errors = 1;
        this.alert("That username doesn't exist");
        this.navCtrl.push(GeneralPage);
      }*/
      else{
        if(errors == 0){
          this.index = -1;
          this.data = "";
          this.data = this.data.concat(this.fire.auth.currentUser.email);
          this.data = this.data.concat(this.friend);
          for(var i = 0; i < this.friends.length; i++){
            if(this.friends[i].$value == this.data){
              this.index = i;
            }
          }
          if(this.index > 0){
            this.alert("You are already friends with that user");
            this.navCtrl.push(GeneralPage);
          }
          else{
            this.alert("You added "+this.friend);
            this.notification = "";
            this.notification = this.notification.concat(this.fire.auth.currentUser.email);
            this.notification = this.notification.concat(" has added ");
            this.notification = this.notification.concat(this.friend);
            this.fdb.list("/friends/").push(this.data);
            this.fdb.list("/notifications").push(this.notification);
            this.navCtrl.push(GeneralPage);
          } 
        }
      }
    //});
  }

}