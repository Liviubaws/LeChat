import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LeChat } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { GeneralPage } from '../pages/general/general';
import { AddPage } from '../pages/add/add';
import { RemovePage } from '../pages/remove/remove';
import { ChatPage} from '../pages/chat/chat';
import { IonicStorageModule } from '@ionic/storage';
import { ForgotPage } from '../pages/forgot/forgot';
import { NotificationsPage} from '../pages/notifications/notifications';
import { FIREBASE_CONFIG } from './environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  declarations: [
    LeChat,
    HomePage,
    RegisterPage,
    GeneralPage,
    AddPage,
    RemovePage,
    ChatPage,
    NotificationsPage,
    ForgotPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LeChat),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LeChat,
    HomePage,
    RegisterPage,
    GeneralPage,
    AddPage,
    RemovePage,
    ChatPage,
    NotificationsPage,
    ForgotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
