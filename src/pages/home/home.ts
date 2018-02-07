import { Component } from '@angular/core';
import { NavController , Platform, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidatorProvider} from '../../providers/validator/validator';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public details: any = {
    name: 'Charles Chapman',
    occupation: 'Code Monkey',
    platform: 'Other'
  };

  private form2 : FormGroup;
  private name: any;

  public formMovie : FormGroup;
  public storageKey : string ="MoviesObj";
  public isData: boolean = false;
  public storedData: any = null;
  public movies: any = [];
  public filmTitle: any;

  constructor(public navCtrl: NavController, public fb: FormBuilder, private val: ValidatorProvider, public toastCtrl : ToastController, private _PLAT: Platform, public _LOCAL: LocalStorageProvider) {
    this.form2 = fb.group({
      'name': ['', Validators.required, val.nameValid],
      'occupation':[''],
      'platform': ['']
    });
    this.name = this.form2.controls['name'];
    this.name.valueChanges.subscribe((value: string) => {
      console.log(`Entered name is ${value}`);
    });

    this._PLAT.ready().then(() =>{
      this.renderMovies();
    });
    this.formMovie=fb.group({
      "movieName": ['', Validators.required]
    });
    this.clearFieldValues();
  }

  renderMovies():void{
    this._LOCAL.getItems(this.storageKey)
    .then((data) =>{
      let existingData = Object.keys(data).length;
      if(existingData != 0){
        this.storedData = data;
        this.isData = true;
      }
      this.resetMovies(this.storedData);
    });
  }

  resetMovies(data:any):void{
    let k;
    this.movies,length=0;
    for(k in data){
      this.movies.push({
        movie: data[k].movie
      });
    }

  }

  saveMovie(): void{
    let movie: string = this.formMovie.controls["movieName"].value,
    i : number =0,
    k;
    for(k in this.storedData){
      if(this.storedData[k].movie === movie){
        i++;
      }
    }
    if(i === 0){
      this.movies.push({
        movie: movie
      });
      this.storeMovie(this.movies, movie)
    }
    else{
      let message = `The movie ${movie} has already been stored. Please enter a different movie title.`;
      this.storageNotification(message);
    }
  }

  storeMovie(movies: any, movie: string): void{
    let moviesStored = JSON.stringify(movies);
    this._LOCAL.setItem(this.storageKey, moviesStored)
    .then((data: any) =>{
      this.renderMovies();
      let message = `The movie title ${movie} was added`;
      this.clearFieldValues();
      this.storageNotification(message);
    })
    .catch((error: any) =>{
      let message = `Whoops! Something went wrong. The movie title ${movie} was NOT added` ;
      this.storageNotification(message);
    });
  }

  clearFieldValues(): void{
    this.filmTitle = "";
  }

  storageNotification(message): void{
    let notification = this.toastCtrl.create({
      message: message,
      duration : 3000
    });
    notification.present();
  }

  saveDetails(){
    console.log(`My name is ${this.details.name}`);
    console.log(`I work as a ${this.details.occupation}`);
    console.log(`My favorite platform is ${this.details.platform}`);
  }
 saveDetails2(value){
   console.dir(value);
 }

saveDetails3(value){
  console.dir(value);
}



}
