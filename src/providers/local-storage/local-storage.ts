import { HttpModule } from '@angular/http';
import {HttpClientModule } from '@angular/common/http';
//import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageProvider {
  private storedData: any;
                   
  constructor(public http: HttpModule, public httpClient: HttpClientModule, private _STORE: NativeStorage) { 
    console.log('Hello LocalStorageProvider Provider');
  }

setItem(itemName, itemValue): any{
  return new Promise(resolve =>{
    this._STORE.setItem(itemName, itemValue)
    .then((data) =>{  
      resolve(true);
    })
    .catch((error) =>{
     // console.log("Failed to set storage key value");
    });
  });
}

getItems(itemKey){
  return new Promise(resolve => {
    this._STORE.getItem(itemKey)
    .then((data)=> {
      this.storedData = JSON.parse(data);
      resolve(this.storedData);
    })
    .catch((error) =>{
      console.log("We don't get that data");
    })
  });
}

}
