import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { currentUser } from '../home/home';
import { Storage } from '@ionic/storage';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public friends: Storage, public database: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemovePage');
  }
  remove(){
    this.database.get(this.friend).then((result) => {
      if(result == null){
        alert("That username doesn't exist");
        this.navCtrl.push(GeneralPage);
      }
      else{
        this.friends.get(currentUser).then((check) => {
          if(check == this.friend){
            alert("Friend removed");
            this.friends.remove(currentUser);
            this.navCtrl.push(GeneralPage);
          }
          else{
            alert("That user is not your friend");
            this.navCtrl.push(GeneralPage);
          }
        });
      }
    });
  }
}
