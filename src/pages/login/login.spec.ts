import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform,NavController,NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage} from './login';
import { PlatformMock, StatusBarMock, SplashScreenMock,NavMock } from '../../../test-config/mocks-ionic';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { Component } from '@angular/core';
import {MyApp} from "../../app/app.component";
import {By} from "@angular/platform-browser";
import {RegisterPage} from "../register/register";
import {CreatePage} from "../create/create";
import {AuthService} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {LoginedBrowsePage} from "../logined-browse/logined-browse";



class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

describe('Login Component', () => {
	let fixture;
	let component;
  let de;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginPage],
			imports: [
				IonicModule.forRoot(LoginPage),
        AngularFireModule.initializeApp(FIREBASE_CONFIG)

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
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
	});
	it('should be created', () => {
		expect(component instanceof LoginPage).toBe(true);
	});
  it('shoud be defined',() =>{
    expect(component).toBeDefined()
  });
  it("email input must be empty",()=>
  {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      let input = fixture.debugElement.query(By.css("ion-input [name=email]"));
      expect(input.innerText).toBeUndefined();
    })
  });
  it("password input must be empty",()=>
  {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      let input = fixture.debugElement.query(By.css("ion-input [name=password]"));
      expect(input.innerText).toBeUndefined();
    })
  });
  it("email and password should save data", ()=>{
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      let input1 = fixture.debugElement.query(By.css("ion-input [name=password]"));
      let input2 = fixture.debugElement.query(By.css("ion-input [name=email]"));
      let el1 = input1.nativeElement;
      let el2 = input2.nativeElement;
      el1.value = "value";
      el2.value = "value";
      el1.dispatchEvent(new Event("input"));
      el2.dispatchEvent(new Event("input"));
      expect(el1.value).toBe("value");
      expect(el2.value).toBe("value");
    })
  });
  it("login() must called after click",()=>{
    fixture.detectChanges();
    fixture.whenStable().then(()=>
    {
      let button = fixture.debugElement.query(By.css("ion-button [class=submit-btn]"));
      let el = button.nativeElement;
      button.dispatchEvent(new Event("click"));
      expect(component.login).toHaveBeenCalled();
    });
  });
  it("createAccount() must called after click",()=>{
    fixture.detectChanges();
    fixture.whenStable().then(()=>
    {
      let button = fixture.debugElement.query(By.css("ion-button [class=register-btn]"));
      let el = button.nativeElement;
      button.dispatchEvent(new Event("click"));
      expect(component.createAccount).toHaveBeenCalled();
    });
  });

});
