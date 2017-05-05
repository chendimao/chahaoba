import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {PhoneBelongPage} from "../pages/phone-belong/phone-belong";
import {HomeZipPage} from "../pages/home-zip/home-zip";
import {WorldZipPage} from "../pages/world-zip/world-zip";
import {CheaterTelPage} from "../pages/cheater-tel/cheater-tel";
import {TabsPage} from "../pages/tabs/tabs";
import {WorldZipDetailsPage} from "../pages/world-zip-details/world-zip-details";
import {ObjToArrayPipe} from "../Pipe/ObjtoArray.pipe";
import {CheaterTelDetailsPage} from "../pages/cheater-tel-details/cheater-tel-details";
import {CheaterTelNewsPage} from "../pages/cheater-tel-news/cheater-tel-news";
import {AdMob} from '@ionic-native/admob';
import {ContactsPage} from "../pages/contacts/contacts";




@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PhoneBelongPage,
    HomeZipPage,
    WorldZipPage,
    CheaterTelPage,
    WorldZipDetailsPage,
    ObjToArrayPipe,
    CheaterTelDetailsPage,
    CheaterTelNewsPage,
    ContactsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PhoneBelongPage,
    HomeZipPage,
    WorldZipPage,
    CheaterTelPage,
    WorldZipDetailsPage,
    CheaterTelDetailsPage,
    CheaterTelNewsPage,
    ContactsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
      AdMob,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
