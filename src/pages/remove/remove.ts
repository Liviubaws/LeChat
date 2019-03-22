import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { friends} from '../add/add'
import { GeneralPage } from '../general/general';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemovePage');
  }
  remove(){
    var i = 0;
    var removed = 0;
    for(i = 0 ; i < friends.length; i++){
      if(this.friend == friends[i]){
        const index = friends.indexOf(this.friend, 0);
            if (index > -1) {
              removed++;
              friends.splice(index, 1);
            }
      }
    }
    if(removed == 0){
      console.log("That user is not your friend");
      alert("That user is not you friend");
      this.navCtrl.push(GeneralPage);
    }
    else{
      alert("Friend removed");
      console.log("Friend removed");
      this.navCtrl.push(GeneralPage);
    }
  }
}
