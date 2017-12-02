import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform,NavController,NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CabinetPage } from './cabinet';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';

import { Component } from '@angular/core';
import {MyApp} from "../../app/app.component";

import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {CreatePage} from "../create/create";
import {AuthService} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginedBrowsePage} from "../logined-browse/logined-browse";


class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

describe('Cabinet Component', () => {
	let fixture;
	let component;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CabinetPage],
			imports: [
				IonicModule.forRoot(CabinetPage)
			],
			providers: [
				{ provide: StatusBar, useClass: StatusBarMock },
				{ provide: SplashScreen, useClass: SplashScreenMock },
				{ provide: Platform, useClass: PlatformMock },
        {provide: AngularFireAuth, useClass:AngularFireAuth},
        {provide:NavParams, useClass:MockNavParams},
        {provide:NavController, useClass:NavController},
			]
		})
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(CabinetPage);
		component = fixture.componentInstance;
	});
	it('should be created', () => {
		expect(component instanceof CabinetPage).toBe(true);
	});
  it('shoud be defined',() =>{
    expect(component).toBeDefined()
  });
});
