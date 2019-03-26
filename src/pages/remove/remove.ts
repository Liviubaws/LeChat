import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the RemovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remove',
  templateUrl: 'remove.html',
})
export class RemovePage {
  friend:string;
  data:string;
  friends = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fire: AngularFireAuth, public fdb: AngularFireDatabase) {
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
    console.log('ionViewDidLoad RemovePage');
  }
  remove(){
    this.data = "";
    this.data = this.data.concat(this.fire.auth.currentUser.email);
    this.data = this.data.concat(this.friend);
    if(this.friends.indexOf(this.data) < 0){
      this.alert("That user is not your friend");
      this.navCtrl.push(GeneralPage);
    }
    else{
      this.fdb.list(`/friends/`).remove(this.friends[this.friends.indexOf(this.data)].$key);
      this.alert(this.friend + " is no longer your friend");
      this.navCtrl.push(GeneralPage);
    }
  }
}
