import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usernames} from '../register/register';
import { GeneralPage } from '../general/general';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export var friends = new Array(50);

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  friend:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  add(){
    var i = 0;
    var sent = 0;
    for(i = 0; i < usernames.length; i++){
      if(this.friend == usernames[i]){
        alert("Friend added");
        friends.push(this.friend);
        sent++;
        this.navCtrl.push(GeneralPage);
      }
    }
    if(sent == 0){
      alert("The username doesn't exist");
      this.navCtrl.push(GeneralPage);
    }
  }

}
