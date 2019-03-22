import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  getPassword(){
    this.database.get(this.username).then((result) => {
      if(result == null){
        alert("That username doesn't exist");
        this.navCtrl.push(HomePage);
      }
      else{
        alert(result);
        this.navCtrl.push(HomePage);
      }
    });
  }
}
