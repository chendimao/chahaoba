import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {WorldZipDetailsPage} from '../world-zip-details/world-zip-details';

/*
  Generated class for the WorldZip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-world-zip',
  templateUrl: 'world-zip.html',
  providers: [HomeService]
})
export class WorldZipPage {
  public WorldZips:Array<WorldZip>;
  public WorldList:Array<WorldZip>;
  url:string='https://www.chahaoba.cn/international-areacode-json';
  public is_browser: boolean;
  constructor(public plt:Platform,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {

    if (this.plt.is('mobileweb') || this.plt.is('core') || this.plt.is('windows') ) {
      this.is_browser=true;
    }


    var worldlsit=Array();

    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();

    this.service.get(this.url).then(data=>{



      data['nodes'].forEach((d)=>{
        this.WorldZips=[new WorldZip(d['node']['field_areacode_text'],d['node']['field_country'],d['node']['field_country_english'],d['node']['nid'])];
        worldlsit.push(this.WorldZips[0]);
      })
      this.WorldList=worldlsit;
      loader.dismiss();
    });

  }



  openNavDetailsPage(worldzip){
    this.navCtrl.push(WorldZipDetailsPage,{worldzip:worldzip});
  }

}


export class WorldZip{

  constructor(
      public field_areacode_text:string,
      public field_country:string,
      public field_country_english:string,
      public nid:string
  ){

  }

}
