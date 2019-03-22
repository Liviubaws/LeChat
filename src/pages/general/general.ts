import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { usernames, passwords } from '../register/register';
import { HomePage, currentUser } from '../home/home';
import { AddPage } from '../add/add';
import { RemovePage } from '../remove/remove';
import { NotificationsPage} from '../notifications/notifications';
import { ChatPage } from '../chat/chat';


/**
 * Generated class for the GeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})


export class GeneralPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralPage');
  }
  addFriend() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Friends',
      buttons: [
        {
          text: 'Add friend',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(AddPage);
            console.log('Add clicked');
          }
        },{
          text: 'Remove friend',
          icon: 'backspace',
          handler: () => {
            this.navCtrl.push(RemovePage);
            console.log('Remove clicked');
          }
        },{
          text: 'Cancel',
          role: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  account() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Account',
      buttons: [
        {
          text: 'Delete account',
          icon: 'close-circle',
          handler: () => {
            const index = usernames.indexOf(currentUser, 0);
            if (index > -1) {
              usernames.splice(index, 1);
              passwords.splice(index, 1);
            }
            alert("Are you sure?");
            console.log('Delete account clicked');
            this.navCtrl.push(HomePage);
          }
        },{
          text: 'Cancel',
          role: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  chat() {
    this.navCtrl.push(ChatPage);
  }
  notifications() {
    this.navCtrl.push(NotificationsPage);
  }
}
