import {Component, ViewChild} from '@angular/core';
import {Platform, ToastController, Nav, IonicApp} from 'ionic-angular';
 import {StatusBar} from '@ionic-native/status-bar';
 import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {AdMob} from '@ionic-native/admob';






@Component({
  templateUrl: 'app.html',
  providers:[AdMob]
})
export class MyApp {
  rootPage = TabsPage;
  public admobid : {banner:string,interstitial:string};
  constructor(public admob: AdMob,public ionicApp: IonicApp, public platform: Platform, public toastCtrl: ToastController,
              public statusBar:StatusBar,public splashScreen:SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件


    //   let options = {
    //     adId:'ca-app-pub-7966123579281585/9304560759',
    //     adSize:'SMART_BANNER',
    //     isTesting:false
    // };
    //
    //   this.admob.createBanner(options).then(()=> {
    //     this.admob.showBanner(8);
    //   });


      if( /(android)/i.test(navigator.userAgent) ) { // for android
        this.admobid = {
          banner: 'ca-app-pub-9094871827609791/5423602991', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-9094871827609791/6900336196'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        this.admobid = {
          banner: 'ca-app-pub-9094871827609791/7863438192', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-9094871827609791/6760735396'
        };
      } else { // for windows phone
        this.admobid = {
          banner: 'ca-app-pub-9094871827609791/5423602991', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-9094871827609791/6900336196'
        };
      }

      // 显示广告条,默认在顶端的智能广告条
      if(this.admob) {
        this.admob.createBanner( this.admobid.banner );


      }

      if(this.admob) this.admob.createBanner( {
        adId:this.admobid.banner,
        adSize:'SMART_BANNER',
        overlap:false,
        position:this.admob.AD_POSITION.TOP_CENTER,
        autoShow:true} );





    });
  }


  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => {
        });
        activePortal.onDidDismiss(() => {
        });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时,即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }


  //初始化广告
  // private initAds(){
  //   if(!this.admob){
  //     console.log('Admob not found');
  //     return ;
  //   }
  //
  //   this.setAdMobIds();
  //   this.setAdMobOptions();
  //   this.registerAdMobEvents();
  // }
  //
  // private setAdMobIds(){
  //
  //   if(this.platform.is('android')){
  //     this.adMo
  //   }
  //
   }
  //

  //Example impleme