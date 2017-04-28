import { Component ,ViewChild,} from '@angular/core';

import {PhoneBelongPage} from "../phone-belong/phone-belong";
import {HomeZipPage} from "../home-zip/home-zip";
import {WorldZipPage} from "../world-zip/world-zip";
import {CheaterTelPage} from "../cheater-tel/cheater-tel";
import {Tabs,Platform} from "ionic-angular";
import {AdMob} from '@ionic-native/admob';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild('mainTabs') tabs:Tabs;
  tab1Root: any = PhoneBelongPage;
  tab2Root: any = HomeZipPage;
  tab3Root: any = WorldZipPage;
  tab4Root: any = CheaterTelPage;

  public admobid : {banner:string,interstitial:string};
  constructor(public admob:AdMob,public platform:Platform) {
  this.platform.ready().then(()=>{


    if( /(android)/i.test(navigator.userAgent) ) { // for android
      this.admobid = {
        banner: 'ca-app-pub-7966123579281585/9304560759', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-7966123579281585/9304560759'
      };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
      this.admobid = {
        banner: 'ca-app-pub-7966123579281585/9304560759', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-7966123579281585/9304560759'
      };
    } else { // for windows phone
      this.admobid = {
        banner: 'ca-app-pub-7966123579281585/9304560759', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-7966123579281585/9304560759'
      };
    }



    //显示广告条,默认在顶端的智能广告条
    if(this.admob) this.admob.createBanner( this.admobid.banner );

  });






  }
}
