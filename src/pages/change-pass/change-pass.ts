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
  newpassrep:string;
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
    var errors = 0;
    if(this.newpass.length < 7){
      errors++;
      this.alert("Password too short. Need at least 8 characters");
      this.navCtrl.push(GeneralPage);
    }
    if(this.newpass != this.newpassrep){
      errors++;
      this.alert("Passwords don't match");
      this.navCtrl.push(GeneralPage);
    }
    if(errors == 0){
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
}
