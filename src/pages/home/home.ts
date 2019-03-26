import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage} from '../register/register';
import { GeneralPage } from '../general/general';
import { ForgotPage} from '../forgot/forgot';
import { AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  username:string;
  password:string;

  constructor(public navCtrl: NavController, private fire: AngularFireAuth, private alertCtrl: AlertController){
  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  login(){
    this.fire.auth.signInWithEmailAndPassword(this.username, this.password).then(data =>{
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
      this.alert(error.message);
    });
  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  forgot(){
    this.navCtrl.push(ForgotPage);
  }
}
