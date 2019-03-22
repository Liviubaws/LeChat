import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { GeneralPage } from '../pages/general/general';
import { AddPage } from '../pages/add/add';
import { RemovePage } from '../pages/remove/remove';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ChatPage } from '../pages/chat/chat';
import { IonicStorageModule } from '@ionic/storage';
import { ForgotPage } from '../pages/forgot/forgot';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    GeneralPage,
    AddPage,
    RemovePage,
    NotificationsPage,
    ChatPage,
    ForgotPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'database',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
      storeName: 'database'
    }),
    IonicStorageModule.forRoot({
      name: 'friends',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
      storeName: 'friends'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    GeneralPage,
    AddPage,
    RemovePage,
    NotificationsPage,
    ChatPage,
    ForgotPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
