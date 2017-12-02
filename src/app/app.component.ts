import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import {BrowsePage} from "../pages/browse/browse";
import {CreatePage} from "../pages/create/create";
import {CabinetPage} from "../pages/cabinet/cabinet";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {LoginedBrowsePage} from "../pages/logined-browse/logined-browse";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from "firebase";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = BrowsePage;


  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen

  ) {


    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Browsing routes', component: BrowsePage },
      { title: 'Creating routes', component: CreatePage },
      { title: "Cabinet",        component: CabinetPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
