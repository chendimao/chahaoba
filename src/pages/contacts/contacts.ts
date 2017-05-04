///<reference path="../../../node_modules/@ionic-native/contacts/index.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Contacts} from '@ionic-native/contacts';
import {Platform} from "ionic-angular";


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contactlist:any;
  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams) {

    this.platform.ready().then(()=>{

      // console.log(Contacts);
      // var opts = {
      //   filter : "",
      //   multiple: true,
      //   hasPhoneNumber:true,
      //   fields:  [ 'displayName', 'name' ]
      // };







    });


  }



}
