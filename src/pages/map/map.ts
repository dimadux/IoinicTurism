import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  route = [];
  map:any;
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform) {
    this.route = navParams.get("routes");
    console.log(this.route["locations"]);
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }
  loadMap()
  {
    let coords = []
    for(let i=0;i<this.route["locations"].length;i+=2)
    {
      coords.push({
        lat:this.route["locations"][i],
        lng:this.route["locations"][i+1]
      })
    }

    let latLng = new google.maps.LatLng(54.9290, 31.6010);
    let mapEle = document.getElementById("map");
    console.log(mapEle);
    let mapOptions = {
      center: latLng,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    try{
    this.map = new google.maps.Map(mapEle, mapOptions);
    }
    catch(e)
    {
      console.log(e);
    }
    for(let cord of coords)
    {
      this.addMarkers(cord,this.map)
    }
  }

  addMarkers(location, map) {
       let locs = [location["lng"],location["lat"]];
       let mark = new google.maps.LatLng(location["lng"],location["lat"]);
       console.log(locs);
       var marker = new google.maps.Marker({
         position: mark,
         label: this.labels[this.labelIndex++ % this.labels.length],
         map: map
       });
     }

  ionViewDidLoad() {
    setTimeout(this.loadMap(),1000);
    console.log('ionViewDidLoad MapPage');
  }

}
