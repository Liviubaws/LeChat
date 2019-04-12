import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { GeneralPage } from '../general/general';

/**
 * Generated class for the ChangePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  newpass:string;
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
    console.log('ionViewDidLoad ChangePassPage');
  }
  changePass(){
    this.fire.auth.currentUser.updatePassword(this.newpass).then(data => {
      this.alert("Password changed successfully");
      this.fire.auth.signOut;
      this.navCtrl.push(HomePage);
    })
    .catch(error => {
      this.alert(error.message);
      this.navCtrl.push(GeneralPage);
    })
  }
}
