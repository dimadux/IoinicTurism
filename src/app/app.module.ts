import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import {AuthService} from "../providers/auth-service/auth-service";
import {IonicStorageModule} from "@ionic/storage";

import {BrowsePage} from "../pages/browse/browse";
import {CreatePage} from "../pages/create/create";
import {CabinetPage} from "../pages/cabinet/cabinet";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {LoginedBrowsePage} from "../pages/logined-browse/logined-browse";
import {MapPage} from "../pages/map/map";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireAuthModule} from "angularfire2/auth";
@NgModule({
  declarations: [
    MyApp,
    BrowsePage,
    CreatePage,
    CabinetPage,
    LoginPage,
    RegisterPage,
    LoginedBrowsePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowsePage,
    CreatePage,
    CabinetPage,
    LoginPage,
    RegisterPage,
    LoginedBrowsePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
