import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform,NavController,NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreatePage} from './create';
import { PlatformMock, StatusBarMock, SplashScreenMock,NavMock } from '../../../test-config/mocks-ionic';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { Component } from '@angular/core';
import {MyApp} from "../../app/app.component";
import {By} from "@angular/platform-browser";
import {RegisterPage} from "../register/register";
import {AuthService} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {LoginedBrowsePage} from "../logined-browse/logined-browse";
import {Storage} from "@ionic/storage";


class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

class MockStorage{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

describe('Create Component', () => {
	let fixture;
	let component;
  let de;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreatePage],
			imports: [
				IonicModule.forRoot(CreatePage),
        AngularFireModule.initializeApp(FIREBASE_CONFIG)

			],
			providers: [
				{ provide: StatusBar, useClass: StatusBarMock },
				{ provide: SplashScreen, useClass: SplashScreenMock },
				{ provide: Platform, useClass: PlatformMock },
        {provide: AngularFireAuth, useClass:AngularFireAuth},
        {provide:NavParams, useClass:MockNavParams},
        {provide:NavController, useClass:NavController},
        {provide:Storage, useClass: MockStorage}
			]
		})
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(CreatePage);
		component = fixture.componentInstance;
	});
	it('should be created', () => {
		expect(component instanceof CreatePage).toBe(true);
	});
  it('shoud be defined',() =>{
    expect(component).toBeDefined()
  });
  it("name input must be empty",()=>
  {
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      let input = fixture.debugElement.query(By.css("ion-input [name=aloha]"));
      expect(input.innerText).toBeUndefined();
    })
  });
  it("name should save data", ()=>{
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      let input1 = fixture.debugElement.query(By.css("ion-input [name=aloha]"));
      let el1 = input1.nativeElement;
      el1.value = "value";
      el1.dispatchEvent(new Event("input"));
      expect(el1.value).toBe("value");
    })
  });
  it("country value must be empty",()=>{
    fixture.whenStable().then(()=>{
      let input = fixture.debugElement.quert(By.css("ion-select"))
      let el = input.nativeElement;
      expect(el.value).toBeUndefined();
    });
  });
  it("fn createRoute must be called after click",(){
    fixture.detectChanges();
    fixture.whenStable().then(()=>
    {
      let button = fixture.debugElement.query(By.css("ion-button [class=submit-btn]"));
      let el = button.nativeElement;
      button.dispatchEvent(new Event("click"));
      expect(component.createRoute).toHaveBeenCalled();
    });
  });

});
