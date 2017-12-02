import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {MyApp} from "../../app/app.component";

import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {CreatePage} from "../create/create";
import {AuthService} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginedBrowsePage} from "../logined-browse/logined-browse";
@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})



export class BrowsePage {
  pushPageIn: any;
  pushPageUp: any;
  email: string = "";
  username:string = "";
  navBarTemple: string = '<button ion-button round class="navbarButton" [navPush]="pushPageIn">Log in</button><button ion-button round class="navbarButton" [navPush]="pushPageUp">Sign up</button>'

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toast: ToastController) {
    this.pushPageIn = LoginPage;
    this.pushPageUp = RegisterPage;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
    if(this.afAuth.auth.currentUser)
    {
      console.log(this.afAuth.auth.currentUser);
      this.navCtrl.setRoot(LoginedBrowsePage);
    }
    if (this.navParams.get("registration") === "Success")
    {
    this.toast.create({
      message: "Registration complete. You can login at any time. Welcome in Type and Hide",
      duration: 4000}
    ).present();
    }
    if(this.navParams.get("registration") === "Out")
    {
      this.toast.create({
        message: "Successfully signed out",
        duration: 4000
      }).present();
    }
  }

}
