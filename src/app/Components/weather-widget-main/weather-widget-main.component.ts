  
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  constructor() { };
  someInput: null;
  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
   // this.WeatherData.controller('DemoCtrl',function($http) {
     // var ctrl=this;
     // var URL = 'https://api.openweathermap.org/data/2.5/weather?q=salem&appid=66b0bb19fc5ff688ba22b01908aa4ed9';
     // var request ={
      ////  method:'GET',
       // url: URL,
        //params:{
          //q: ctrl.cityName,
          //mode:'json',
        //}
     // }
     // ctrl.submitForm=function(){
       // $http(request)
        //.then(function(response){
         // ctrl.data=response.data;
         // console.log(ctrl.data);
        //})
     // }
   // })
   //this.getWeatherData(data);
   console.log(this.WeatherData);
  }

  getWeatherData(data){
    console.log(data.city)
    var api = 'https://api.openweathermap.org/data/2.5/weather?q='+data.city+'&appid=66b0bb19fc5ff688ba22b01908aa4ed9'
    console.log(api)
    fetch(api)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }
  playerName: string;
onSubmit() {
  console.log(this.playerName);
}
  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}