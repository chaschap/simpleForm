//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';

/*
  Generated class for the ValidatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidatorProvider {

  constructor(public http: Http) {
    console.log('Hello ValidatorProvider Provider');
  }
nameValid(control: FormControl){
  return new Promise(resolve =>{
    let pattern = /[0-9]/;
    if(pattern.test(control.value)){
      resolve({InvalidName : true});
    }
    resolve(null);
  });
}
}
