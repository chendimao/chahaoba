import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Contacts}  from '@ionic-native/contacts';
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
import {Network} from '@ionic-native/network'
import {ContactDetailsPage} from '../pages/contact-details/contact-details';


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
    ContactsPage,
    ContactDetailsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }, {}),
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
    Contacts,
    ContactsPage,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
