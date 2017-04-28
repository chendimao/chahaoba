import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomeService} from "../../providers/home-service";
import {CheaterTelDetailsPage} from "../cheater-tel-details/cheater-tel-details";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {CheaterTelNewsPage} from "../cheater-tel-news/cheater-tel-news";


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
    constructor(private formBuilder: FormBuilder,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public service:HomeService) {

      this.todo=this.formBuilder.group({
        'page':['',Validators.required],
      });


      let loader = this.loadingCtrl.create({
        content: "数据查询中，请稍等...",
        //dismissOnPageChange:true,
        duration: 0
      });
      loader.present();



      this.service.get(this.url+'?page='+(this.page)).then(data=>{
        data['nodes'].forEach((d)=>{
          this.tel_list.push(d['node']);
        });
        this.pages=data['view']['pages'];
        this.page=data['view']['page'];
        console.log(this.page);

        loader.dismiss();
      });




  }


  //表单跳转页面
  FindPage(){
    //验证是否为空
    this.tel_list=Array();
   // console.log(this.todo.value['page']);



    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();


    this.page=this.todo.value['page']-1;


    this.service.get(this.url+'?page='+this.page).then(data=>{
      data['nodes'].forEach((d)=>{

        this.tel_list.push(d['node']);
      });
      this.pages=data['view']['pages'];
      this.page=data['view']['page'];
     // console.log('表单跳转'+data['view']['page']);

      loader.dismiss();
    });



  }

  //跳转到第一页

  FindFirstPage(){
    this.tel_list=Array();
    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();

    this.service.get(this.url+'?page=0').then(data=>{
      data['nodes'].forEach((d)=>{

        this.tel_list.push(d['node']);
      });

      console.log(this.page);
      this.todo.value['page']=this.page;
      loader.dismiss();
    });

  }


//跳到最后一页
  FindLastPage(){
    this.tel_list=Array();
    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();

    this.service.get(this.url+'?page='+this.pages).then(data=>{
      data['nodes'].forEach((d)=>{

        this.tel_list.push(d['node']);
      });
      this.pages=data['view']['pages'];
      this.page=data['view']['page'];
      this.todo.value['page']=this.page;
      loader.dismiss();
    });

  }


  //前一页
  FindPrevPage(){
    this.tel_list=Array();
    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();

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
      loader.dismiss();
    });

  }

  //后一页
  FindNextPage(){
    this.tel_list=Array();
    let loader = this.loadingCtrl.create({
      content: "数据查询中，请稍等...",
      //dismissOnPageChange:true,
      duration: 0
    });
    loader.present();

    if(this.page<this.pages){
        this.page=this.page+1;
    }

    this.service.get(this.url+'?page='+this.page).then(data=>{
      data['nodes'].forEach((d)=>{

        this.tel_list.push(d['node']);
      });
      this.pages=data['view']['pages'];
      this.page=data['view']['page'];
      console.log('后一页'+this.page);
      this.todo.value['page']=this.page;
      loader.dismiss();
    });

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

