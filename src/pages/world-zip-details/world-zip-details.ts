import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";




/*
  Generated class for the WorldZipDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-world-zip-details',
  templateUrl: 'world-zip-details.html',
  providers:[HomeService]
})
export class WorldZipDetailsPage {


  public worldzip;
  public country:string;
  public body:string;
  public url:string='https://www.chahaoba.cn/country-json/';
  public comment_url:string='';
  public is_browser:boolean;
  constructor(public plt:Platform,public loadCtrl:LoadingController,public AlertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {

    if (this.plt.is('mobileweb') || this.plt.is('core')) {
      this.is_browser=true;
    }
    this.worldzip=this.navParams.data.worldzip;
    this.service.get(this.url+this.worldzip['nid']).then(data=>{
      this.country=data['nodes'][0]['node'];
      // console.log(data['nodes'][0]['node']['body_php']);
      this.body=this.country['body_php_1'];


      if(this.plt.is('mobileweb') || this.plt.is('core')){
        this.body=this.body.replace(this.body.substr( this.body.indexOf(this.worldzip['field_country']+'电话区号参考网站'),this.body.length),'');
      }


    });

  }




}
