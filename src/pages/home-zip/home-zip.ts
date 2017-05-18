import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, Platform} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {AdMob} from '@ionic-native/admob';



/*
  Generated class for the HomeZip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-zip',
  templateUrl: 'home-zip.html',
  providers:[HomeService],
})
export class HomeZipPage {

    public Homezips:Array<HomeZip>;
    public city_list:Array<HomeZip>;
  url:string = 'https://www.chahaoba.cn/national-areacode-json';
  public is_browser:boolean;
  constructor(public plt:Platform,public admob:AdMob,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {

      if (this.plt.is('mobileweb') || this.plt.is('core') || this.plt.is('windows') ) {
          this.is_browser=true;
      }


      var city_list=Array();


      let loader = this.loadingCtrl.create({
          content: "数据查询中，请稍等...",
          //dismissOnPageChange:true,
          duration: 0
      });
      loader.present();

    this.service.get(this.url).then(data=>{

        data['nodes'].forEach((d)=>{
          this.Homezips=[new HomeZip(d['node']['field_city_text'],d['node']['field_province_text'],d['node']['nid'],d['node']['title'])];
          city_list.push(this.Homezips[0]);
        });
      this.city_list=city_list;

      loader.dismiss();

  });




  }


}


export class HomeZip{
  constructor(
        public field_city_text:string,
        public field_province_text:string,
        public nid:string,
        public title:string

          ){

          }

}
