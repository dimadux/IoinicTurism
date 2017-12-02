import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowsePage } from './browse';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {NavController,NavParams} from "ionic-angular";

@NgModule({
  declarations: [
    BrowsePage,
  ],
  imports: [
    IonicPageModule.forChild(BrowsePage),
  ],
})
export class BrowsePageModule {}
