import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";

/*
  Generated class for the CheaterTelNews page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cheater-tel-news',
  templateUrl: 'cheater-tel-news.html',
  providers:[HomeService]
})
export class CheaterTelNewsPage {

  public todo:FormGroup;
  public url:string='https://www.chahaoba.cn/drupalgap/node.json';
  public data:string;
  public loader;


  constructor(public alertCtrl:AlertController,public loadingCtrl:LoadingController,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public Service:HomeService) {
    this.todo=this.formBuilder.group({
      'page':['',Validators.required],
      'types':['',Validators.required],
      'title':['',Validators.required],
    });


  }

  //点击添加号码触发函数
  AddTel(){



    if(this.todo['title']==null){
      let alert = this.alertCtrl.create({
        title: '查号吧提示',
        message: `请输入手机号码`,
        buttons: ['确定']
      });
      alert.present(alert);
    }else if(this.todo['types']==null){

      let alert = this.alertCtrl.create({
        title: '查号吧提示',
        message: `请选择号码类型`,
        buttons: ['确定']
      });
      alert.present(alert);


    }else if(this.todo['page']==null){

      let alert = this.alertCtrl.create({
        title: '查号吧提示',
        message: `请输入描述内容`,
        buttons: ['确定']
      });
      alert.present(alert);

    }else{
      //如果输入的号码不等于11位，则提示号码格式错误
      if(this.todo['title'].length!=11){
        let alert = this.alertCtrl.create({
          title: '查号吧提示',
          message: `号码[`+this.todo['title']+`]格式不正确`,
          buttons: ['确定']
        });
        alert.present(alert);
      }else{
        //弹出加载层
        this.Loader('号码添加中，请稍等');



        this.data=`title=`+this.todo['title']+'&body[und][0][value]='+this.todo['page']+'&field_tags[und]='+this.todo['types']+'&type='+'number';
        this.Service.post(this.url,this.data).then(data=>{
        this.loader.dismissAll();


          if(data['nid']!=null){
           this.ShowAlert('查号吧提示','号码添加成功',['确定'])
            this.todo['title']=null;
            this.todo['page']=null;
            this.todo['types']=null;
          }else{
            this.ShowAlert('查号吧提示','号码添加失败',['确定'])

          }

        });


      }
    }



  }



  //显示弹窗
  ShowAlert(titles,messages,button:any){
    let alert = this.alertCtrl.create({
      title: titles,
      message: messages,
      buttons: button
    });
    alert.present(alert);
  }

  //显示加载状态
  Loader(content=''){

    let loader = this.loadingCtrl.create({
      content: content,
      dismissOnPageChange:true,
      duration: 0
    });
    loader.present();
    this.loader=loader;
  }







}
