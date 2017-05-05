///<reference path="../../../node_modules/@ionic-native/contacts/index.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Contacts, ContactFieldType} from '@ionic-native/contacts';
import {Platform} from "ionic-angular";


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  contactlist: any;
  contacttobefound = '';
  contactsfound = [];
  search = false;
  ourvalue: ContactFieldType[]=['displayName'];

  savefn(){
    //this.nav.push(AddcontactPage);
  }

  findfn(val){
      Contacts.find(this.ourvalue,{filter:val}).then((contacts)=>{
        this.contactsfound=contacts;
        alert(JSON.stringify(contacts[0]));
      });

      if(this.contactsfound.length==0){
        this.contactsfound.push({displayName:'No contact find'});
        this.search=true;
      }
  }
  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams) {

  }



}
