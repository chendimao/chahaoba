import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
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
  constructor(public loadCtrl:LoadingController,public AlertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {

    this.worldzip=this.navParams.data.worldzip;
    this.service.get(this.url+this.worldzip['nid']).then(data=>{
      this.country=data['nodes'][0]['node'];
     // console.log(data['nodes'][0]['node']['body_php']);
      this.body=this.country['body_php_1'];


    });

  }




}
