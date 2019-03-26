import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: AngularFireAuth) {
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  getPassword(){
    this.fire.auth.sendPasswordResetEmail(this.username).then(data => {
      this.alert("Reset password email sent");
      this.navCtrl.push(HomePage);
    })
    .catch(error => {
      this.alert(error.message);
      this.navCtrl.push(HomePage);
    });
  }
}
