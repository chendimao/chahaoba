import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



/*
  Generated class for the CheaterTelDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cheater-tel-details',
  templateUrl: 'cheater-tel-details.html',
  providers:[HomeService],
})
export class CheaterTelDetailsPage {

  public todo:FormGroup;
  public cheater;
  public nid;
  public url:string='https://www.chahaoba.cn/number-page-json/';
  public cheater_details;
  public title:string;
  public name:string;
  public body:string;
  public field_tags:string;
  public field_category:string;
  public created:string;
  public comment_url:string='https://www.chahaoba.cn/drupalgap/comment.json';
  public comment_data:string;
  public show_comment_url:string='https://www.chahaoba.cn/comment-json/';
  public show_comment_data:Array<ShowComment>;
  public CommentList:Array<ShowComment>;



  constructor(public formBuilder:FormBuilder,public AlertCtrl:AlertController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {


      this.cheater=this.navParams.data.cheater;

    this.todo=this.formBuilder.group({
        'page':['',Validators.required],
    });
    //弹出加载层
    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();


    this.service.get(this.url+this.cheater['nid']).then(data=>{
        this.cheater_details=data['nodes'][0]['node'];
        this.title=this.cheater_details['title'];
        this.name=this.cheater_details['name'];
        this.body=this.cheater_details['body'];
        this.field_tags=this.cheater_details['field_tags'];
        this.field_category=this.cheater_details['field_category'];
        this.created=this.cheater_details['created'];
        this.nid=this.cheater_details['nid'];
        //console.log(this.cheater_details);

      loader.dismiss();
    });


    var comment_list=Array();
      this.service.get(this.show_comment_url+this.cheater['nid']).then(data=>{
      data['nodes'].forEach((d)=>{
            this.show_comment_data=[new ShowComment(d['node']['changed'],d['node']['name'],d['node']['comment_body'])];

            comment_list.push(this.show_comment_data);

      });
        this.CommentList=comment_list;

      });




  }

    Comments(){
        let loader = this.loadingCtrl.create({
            content: "评论添加中，请稍等...",
            //dismissOnPageChange:true,
            duration: 0
        });
        loader.present();
      this.comment_data=`nid=`+this.nid+`&comment_body[und][0][value]=`+this.todo['page'];
      this.service.post(this.comment_url,this.comment_data).then(data=>{

          if(data['cid']!=null){
              loader.dismiss();
              this.ShowAlert('查号吧提示','评论成功',['确定'])
              this.todo['page']=null;
          }else{
              loader.dismiss();
              this.ShowAlert('查号吧提示','评论失败',['确定']);
          }
      });
  }

    //显示弹窗
    ShowAlert(titles,messages,button:any){
        let alert = this.AlertCtrl.create({
            title: titles,
            message: messages,
            buttons: button
        });
        alert.present(alert);
    }



}


export class ShowComment{
    constructor(
        public changed:string,
        public name:string,
        public comment_body:string
    ){

    }
}
