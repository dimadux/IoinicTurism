import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {BrowsePage} from "../browse/browse";
import {Storage} from "@ionic/storage";
import {MapPage} from "../map/map";
/**
 * Generated class for the LoginedBrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logined-browse',
  templateUrl: 'logined-browse.html',
})
export class LoginedBrowsePage {
  user = {} as User;
  routenames = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth, private toast: ToastController,private storage:Storage) {
    this.storage.forEach((value,key,index)=>
    {
      console.log("The key is",key);
      console.log("The val is",this.exploreData(value));
      let countryc = this.exploreData(value)["Country"];
      let types = this.getNamesFromTypes(this.exploreData(value)["types"]);
      let locs = this.exploreData(value)["locations"];
      console.log("THis is types",types);
      this.routenames.push({
        name:key,
        country:countryc,
        typ:types,
        locations:locs
      })

    }
  );
  }

  getNamesFromTypes(types)
  {
    console.log("The intypes are",types);
    let names = ["Food and Drink","Architecture","Museums","Nature","LowCost","HighCost"];
    let result = [];
    for(let i=0;i<names.length;i++)
    {
      console.log(types[i]);
      if(types[i]==="true")
      {
        result.push(names[i]);
      }
    }
    console.log("The result is",result);
    return result.join(", ");

  }
  exploreData(val)
  {
    let valList = val.split(",");
    let result = {};
    result["locations"] = [];
    result["types"] = []
    for(let el of valList)
    {
      if(parseInt(el))
      {
        result["locations"].push(parseFloat(el));
      }
      else
      {
        if(el == "true" || el == "false"){
        result["types"].push(el)
        }
        else
        {
          result["Country"] = el;
        }
      }
    }
    return result;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginedBrowsePage');
    try{
    this.afAuth.authState.subscribe(data => {
      if(data){
      this.user.email = data.email;
      this.toast.create({
        message: `Welcome to Type and Hide, ${data.email}`,
        duration: 3000
      }).present();
    }
    });
  }
  catch(e)
  {
    alert("Error");
  }
  }


  showMap(route)
  {
    console.log(route["name"]);
    this.navCtrl.push(MapPage,{routes:route});
  }


  logOut()
  {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(BrowsePage,{registration:"Out"});
  }

}
