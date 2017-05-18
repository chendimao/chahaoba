

import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {pinyin} from 'pinyin';
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
public lianxi:any;
public  items;
constructor(public navCtrl: NavController,public contacts: Contacts) {

 // let contact: Contact = this.contacts.create();
  var lianxiren=Array();

  this.contacts.find(['*']).then((contacts)=>{

    contacts.forEach(function(value,index,arr){
     // alert(JSON.stringify(value['_objectInstance']['displayName']));
      //lianxiren.push([new contact(value['_objectInstance']['displayName'],value['_objectInstance']['name']['familyName'],value['_objectInstance']['phoneNumbers']['value'])]);
     // this.lianxi=lianxiren;
      //alert(JSON.stringify(lianxiren));
    });
    this.lianxi=contacts;
    this.initializeItems();

  })


}

  initializeItems() {
    this.items=this.lianxi;

  }

  getItems(ev){
    this.initializeItems();

        var val = ev.target.value;
        var val_tmp=Array();

        //alert(val);
       // alert(this.items[0]['_objectInstance']['displayName']);
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        //alert(item['_objectInstance']['displayName']);
        return (item['_objectInstance']['displayName'].indexOf(val) > -1);
      })
    }
     // alert(this.items);
  }

}

export class contact{
  constructor(

      public displayName:string,
      public familyName:string,
      public tel:string

  ){

  }
}