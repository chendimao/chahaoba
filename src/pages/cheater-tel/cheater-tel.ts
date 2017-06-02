import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams,Platform,AlertController} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {CheaterTelDetailsPage} from "../cheater-tel-details/cheater-tel-details";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {CheaterTelNewsPage} from "../cheater-tel-news/cheater-tel-news";
import {Network} from '@ionic-native/network'

/*
  Generated class for the CheaterTel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cheater-tel',
  templateUrl: 'cheater-tel.html',
  providers:[HomeService],
})
export class CheaterTelPage  implements OnInit{
  public cheaters:Array<Cheater>;


  todo:FormGroup;





  tel_list=Array();
  public pages:number;
  public page:number=0;
  public url:string='https://www.chahaoba.cn/number-json/';
  public is_browser: boolean;
    constructor(public alertCtrl:AlertController,public network:Network,public plt:Platform,private formBuilder: FormBuilder,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {






      if (this.plt.is('mobileweb') || this.plt.is('core') || this.plt.is('windows') ) {
        this.is_browser=true;
      }



      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

      });

      let connectSubscription = this.network.onConnect().subscribe(() => {

        setTimeout(() => {
          this.showNetworkStatus();
        }, 1000);
      });


      setTimeout(() => {

        this.showNetworkStatus();
      }, 1000);





      if(this.network.type!='none') {

        this.todo = this.formBuilder.group({
          'page': ['', Validators.required],
        });



        this.service.get(this.url + '?page=' + (this.page)).then(data => {
          data['nodes'].forEach((d) => {
            this.tel_list.push(d['node']);
          });
          this.pages = data['view']['pages'];
          this.page = data['view']['page'];
          console.log(this.page);


        });

      }else{
        let alert = this.alertCtrl.create({
          title: '邮编库提示',
          message: `请检查您的网络是否连接`,
          buttons: ['确定']
        });

        alert.present(alert);

      }


  }


  //表单跳转页面
  FindPage(){
    //验证是否为空
    this.tel_list=Array();
   // console.log(this.todo.value['page']);


    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

    });

    let connectSubscription = this.network.onConnect().subscribe(() => {

      setTimeout(() => {
        this.showNetworkStatus();
      }, 1000);
    });


    setTimeout(() => {

      this.showNetworkStatus();
    }, 1000);




    if(this.network.type!='none') {





      this.page = this.todo.value['page'] - 1;


      this.service.get(this.url + '?page=' + this.page).then(data => {
        data['nodes'].forEach((d) => {

          this.tel_list.push(d['node']);
        });
        this.pages = data['view']['pages'];
        this.page = data['view']['page'];
        // console.log('表单跳转'+data['view']['page']);

      });

    }else{
      let alert = this.alertCtrl.create({
        title: '邮编库提示',
        message: `请检查您的网络是否连接`,
        buttons: ['确定']
      });

      alert.present(alert);
    }

  }

  //跳转到第一页

  FindFirstPage(){

    //验证是否为空
    this.tel_list=Array();
    // console.log(this.todo.value['page']);

// watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch （停止断网检测）
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait 
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.showNetworkStatus();
      }, 1000);
    });

    // stop connect watch （停止联网检测）
    // connectSubscription.unsubscribe();


    setTimeout(() => {

      this.showNetworkStatus();
    }, 1000);




    if(this.network.type!='none') {


      this.tel_list = Array();


      this.service.get(this.url + '?page=0').then(data => {
        data['nodes'].forEach((d) => {

          this.tel_list.push(d['node']);
        });

        console.log(this.page);
        this.todo.value['page'] = this.page;

      });
    }else{
      let alert = this.alertCtrl.create({
        title: '邮编库提示',
        message: `请检查您的网络是否连接`,
        buttons: ['确定']
      });

      alert.present(alert);
    }
  }


//跳到最后一页
  FindLastPage(){
    this.tel_list=Array();

  // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch （停止断网检测）
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait 
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.showNetworkStatus();
      }, 1000);
    });

    // stop connect watch （停止联网检测）
    // connectSubscription.unsubscribe();


    setTimeout(() => {

      this.showNetworkStatus();
    }, 1000);




    if(this.network.type!='none') {



      this.service.get(this.url + '?page=' + this.pages).then(data => {
        data['nodes'].forEach((d) => {

          this.tel_list.push(d['node']);
        });
        this.pages = data['view']['pages'];
        this.page = data['view']['page'];
        this.todo.value['page'] = this.page;

      });
    }else{
      let alert = this.alertCtrl.create({
        title: '邮编库提示',
        message: `请检查您的网络是否连接`,
        buttons: ['确定']
      });

      alert.present(alert);
    }
  }


  //前一页
  FindPrevPage(){

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch （停止断网检测）
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait 
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.showNetworkStatus();
      }, 1000);
    });

    // stop connect watch （停止联网检测）
    // connectSubscription.unsubscribe();


    setTimeout(() => {

      this.showNetworkStatus();
    }, 1000);




    if(this.network.type!='none') {

    this.tel_list=Array();


    if(this.page>0){
      this.page=this.page-1;
    }

    this.service.get(this.url+'?page='+this.page).then(data=>{
      data['nodes'].forEach((d)=>{

        this.tel_list.push(d['node']);
      });
      this.pages=data['view']['pages'];
      this.page=data['view']['page'];
      console.log(this.page);
      this.todo.value['page']=this.pages;

    });
      }else{
      let alert = this.alertCtrl.create({
        title: '邮编库提示',
        message: `请检查您的网络是否连接`,
        buttons: ['确定']
      });

      alert.present(alert);
    }
  }

  //后一页
  FindNextPage(){

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch （停止断网检测）
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait 
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.showNetworkStatus();
      }, 1000);
    });

    // stop connect watch （停止联网检测）
    // connectSubscription.unsubscribe();


    setTimeout(() => {

      this.showNetworkStatus();
    }, 1000);




    if(this.network.type!='none') {

      this.tel_list = Array();
      let loader = this.loadingCtrl.create({

        //dismissOnPageChange:true,
        duration: 0
      });


      if (this.page < this.pages) {
        this.page = this.page + 1;
      }

      this.service.get(this.url + '?page=' + this.page).then(data => {
        data['nodes'].forEach((d) => {

          this.tel_list.push(d['node']);
        });
        this.pages = data['view']['pages'];
        this.page = data['view']['page'];
        console.log('后一页' + this.page);
        this.todo.value['page'] = this.page;
        loader.dismiss();
      });
    }else{
      let alert = this.alertCtrl.create({
        title: '邮编库提示',
        message: `请检查您的网络是否连接`,
        buttons: ['确定']
      });

      alert.present(alert);
    }
  }

  //网络状态
  showNetworkStatus() {
    if(this.network.type == 'none') {
      return false;
    } else {
      return true;
    }
  }



  //进入骗子号码详情页
  openNavDetailsPage(cheater){

    this.navCtrl.push(CheaterTelDetailsPage,{cheater:cheater});
  }



  //发布新号码
  NewsTel(){

    this.navCtrl.push(CheaterTelNewsPage);
  }


  ngOnInit () {

  }


}

export class Cheater{
  constructor(
      public tel:number,
      public type:string
  ){

  }
}

