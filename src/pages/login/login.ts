import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {BrowsePage} from "../browse/browse";
import {RegisterPage} from "../register/register";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth"
import {LoginedBrowsePage} from "../logined-browse/logined-browse";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user =  {} as User;
  loading: Loading;

  constructor(private nav: NavController, private afAuth: AngularFireAuth , private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    try{
    this.nav.push(RegisterPage);
    }
    catch(e)
    {
      console.log(e);
    }
    return this.nav.getActive();
  }

  public async login(user:User)
  {
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    if(this.afAuth.auth.currentUser)
    {
      console.log(result);
      this.nav.setRoot(LoginedBrowsePage);
    }
    else
    {
      this.nav.push(LoginPage);
    }
    }
    catch(e){
      alert("Couldnt login. Try one more time.");
    }
  }
}
