import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {

  constructor(public http: Http) {

  }


  get(url) {
    return new Promise((resolve, reject) => {
      this.http.get(url)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, err => {
            reject(err);
          })
    })
  };




    post(URL,data) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        return new Promise((resolve, reject) => {
            this.http.post(URL, data, options )
                .map(res => res.json())
                .subscribe(data => resolve(data), err => reject(err))
        })
    }

}







