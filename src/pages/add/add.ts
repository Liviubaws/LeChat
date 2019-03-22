import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { currentUser } from '../home/home';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  friend:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  add(){
    this.database.get(currentUser).then((result) => {
      if(result == null){
        alert("That username doesn't exist");
        this.navCtrl.push(GeneralPage);
      }
      else{
        if(result.search(this.friend) == -1){
          result.concat(this.friend);
          alert("User "+currentUser + " has added "+this.friend);
          this.navCtrl.push(GeneralPage);
        }
        else{
          alert("That user is already your friend");
          this.navCtrl.push(GeneralPage);
        }
      }
    });
  }

}


//Problema cu adaugarea de prieteni
//Daca ii adaug asa, cand dau forgot password o sa apara si prietenii dupa parola
//Daca nu fac asa, ar trebui sa mai am un Storage pt fiecare user in care sa-i adaug prietenii
//Dar iar e problema ca n-as avea cum sa-i diferentiez
//We shall see