import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginedBrowsePage } from './logined-browse';

@NgModule({
  declarations: [
    LoginedBrowsePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginedBrowsePage),
  ],
})
export class LoginedBrowsePageModule {}
