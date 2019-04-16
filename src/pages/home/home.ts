import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { RegisterPage} from '../register/register';
import { GeneralPage } from '../general/general';
import { ForgotPage} from '../forgot/forgot';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  username:string;
  //user:string;
  password:string;
  users = [];
  public unregisterBackButtonAction: any;
  constructor(public navCtrl: NavController, private fire: AngularFireAuth, private alertCtrl: AlertController, public platform: Platform,
    public fdb:AngularFireDatabase){
    this.fdb.list("/users/").subscribe(__users => {
      this.users = __users;
    });
  }
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
      // Unregister the custom back button action for this page
      this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function(event){
          console.log('Prevent Back Button Page Change');
      }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }       
  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  login(){
    var email:string;
    var found = 0;
    for(var i = 0; i < this.users.length; i++){
      if(this.users[i].$value.indexOf(this.username) > -1){
        email = this.users[i].$value.substring(0, this.users[i].$value.length - this.username.length);
        found = 1;
      }
    }
    if(found == 1) {
      console.log(email);
      this.fire.auth.signInWithEmailAndPassword(email, this.password).then(data =>{
        if(this.fire.auth.currentUser.emailVerified == true){
          this.alert('You have successfully logged in!')
          this.navCtrl.push(GeneralPage);
          console.log("Signed in with "+this.username+" and pass "+this.password);
        }
        else{
          this.alert("Please verify your email");
        }
      })
      .catch(error => {
        console.log("Some error");
        this.alert("Username or password are wrong");
      });
    }
    else{
      console.log("Some error");
      this.alert("Username or password are wrong");
    }
  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  forgot(){
    this.navCtrl.push(ForgotPage);
  }
}
