import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, Platform} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Network} from '@ionic-native/network'
/*
  Generated class for the PhoneBelong page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-phone-belong',
  templateUrl: 'phone-belong.html',
  providers:[HomeService],
})



export class PhoneBelongPage implements OnInit{



    //定义查询出的数据的自定义数组类型
  public PhoneBelongs:Array<PhoneBelong>;

  //定义一个表单
   todo:FormGroup;

    //定义一个url
   url: string;
  
    public is_browser:boolean;

    constructor(public network:Network,public plt:Platform,public alertCtrl:AlertController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public service:HomeService) {

        if (this.plt.is('mobileweb') || this.plt.is('core') ) {
            this.is_browser=true;
        }


        //验证title表单不能为空
        this.todo = this.formBuilder.group({
           title:['',Validators.required],
        });

  }
    //点击查询归属之后触发的函数
    TelForm() {

        //弹出加载层
        let loader = this.loadingCtrl.create({
            content: "数据查询中，请稍等...",
            //dismissOnPageChange:true,
            duration: 0
        });
        loader.present();




        //如果用户输入号码大于7位，则截取出前七位
            if(this.todo['title'].length>7){
                this.todo['title']=this.todo['title'].substr(0,7);
            }

            //生成查询接口的地址
        this.url ='https://www.chahaoba.cn/mobile-json/'+this.todo['title'] ;

            //发起获取数据请求

        this.service.get(this.url).then(data=>{

                // console.log(this.url);
                // console.log(data['nodes'].length);
                if(data['nodes'].length>0){
                    this.PhoneBelongs=[ new PhoneBelong(
                        data['nodes'][0]['node']['field_areacode'],
                        data['nodes'][0]['node']['field_card_type'],
                        data['nodes'][0]['node']['field_city'],
                        data['nodes'][0]['node']['field_city_code'],
                        data['nodes'][0]['node']['mobile_number'],
                        data['nodes'][0]['node']['mobile_number_3'],
                        data['nodes'][0]['node']['mobile_number_4'],
                        data['nodes'][0]['node']['mobile_number_5'],
                        data['nodes'][0]['node']['mobile_number_6'],
                        data['nodes'][0]['node']['field_operator'],
                        data['nodes'][0]['node']['field_postcode'],
                        data['nodes'][0]['node']['field_province'],
                        data['nodes'][0]['node']['title'],
                    )];
                }else{
                    //如果未查找到号码，则弹出提示框
                    let alert = this.alertCtrl.create({
                        title: '查号吧提示',
                        message: `暂未查询到[`+this.todo['title']+`]，请检查号码格式是否正确`,
                        buttons: ['确定']
                    });
                    alert.present(alert);
                }

            loader.dismiss();



        });


    };

  ngOnInit(){

  }




}

export class PhoneBelong{

   constructor(
      public  field_areacode:string,
      public  field_card_type:string,
      public  field_city:string,
      public  field_city_code:string,
      public  mobile_number:string,
      public  mobile_number_3:string,
      public  mobile_number_4:string,
      public  mobile_number_5:string,
      public  mobile_number_6:string,
      public  field_operator:string,
      public  field_postcode:string,
      public  field_province:string,
      public  title:string
   ){

   }
}
