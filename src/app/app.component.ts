import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  response:any;
  respExtra:any;
  resD:any;
  artInfo:any;
  artistImages:any;
  vDict:any;


  keywords:string ="";
  locationRadio:any;
  locationString:string;
  type:string = "all";
  radius:number = 10;
  unit:string = "miles";
  segmentId:string="";
  lat: number = -118;
  lng: number = 34;
  localStorageCopy = localStorage;
  mylat: number;
  mylatO: number;
  mylng: number;
  mylngO: number;
  starItems=[];
  currentEvent:any;
  time:any;



  error1:any;
  sortCategory:any;
  sortOrder: any;



  autoComplete:any;
  autoCompleteArray:any;
  geoR:any;
  locationRes:any;
  eventCategory:string;
  ticketmasterapikey = "aj32lPLLBWnbiazafkBDV9SGfv7OlsFb";
  googlemapsapikey = "AIzaSyDq-rFeuWcSauyFNVVI5MRIDV5hTU2k2j4";
  url:string = "";
  showProgressBar: boolean = false;
  favor: boolean;



  searchTerm : FormControl = new FormControl();
  otherLoc : FormControl = new FormControl();
  myEvents = <any>[];

  constructor(private http: HttpClient){


    
  }





  ngOnInit() {
    this.locationRadio = "gloc";
    this.sortCategory = 'default';
    this.sortOrder = 'ascending';
    this.showProgressBar = false;
    this.favor=false;
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '' &&term!=' ') {
          this.url ="https://eventang.wl.r.appspot.com/autocom/"+term;
          this.http.get(this.url)
          .subscribe((response) => {
            this.autoComplete = response;
            if(this.autoComplete._embedded)
            {
              this.autoCompleteArray = this.autoComplete._embedded.attractions;
            }
          });
        }
    })

    this.url ="http://ip-api.com/json";
    this.http.get(this.url)
    .subscribe((response) => {
      this.locationRes = response;
      this.mylat = this.locationRes.lat;
      this.mylatO = this.locationRes.lat;
      this.mylng = this.locationRes.lon;
      this.mylngO = this.locationRes.lon;


    });

    this.starItems = [];
    for(var i=0;i<localStorage.length;i++)
    {
      this.starItems[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }


  



  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }








  sforEvents():void{




    this.showProgressBar = false;    
    this.favor=false;
    if(this.keywords!="")
    {
      this.respExtra = null;
      this.resD = null;
      this.artInfo = [];
      this.artistImages = [];
      this.vDict = null;
    
      if(this.type=='music' || this.type=='Musical')
      {
        this.segmentId = 'KZFzniwnSyZfZ7v7nJ';
      }
      else if(this.type=='sports')
      {
        this.segmentId = 'KZFzniwnSyZfZ7v7nE';
      }
      else if(this.type=='artsandtheater')
      {
        this.segmentId = 'KZFzniwnSyZfZ7v7na';
      }
      else if(this.type=='film')
      {
        this.segmentId = 'KZFzniwnSyZfZ7v7nn';
      }
      else if(this.type=='miscellaneous')
      {
        this.segmentId = 'KZFzniwnSyZfZ7v7n1';
      }



      
      if(this.locationString != null)
      {
        this.url ="https://eventang.wl.r.appspot.com/place/"+this.locationString;

        
        this.http.get(this.url)
        .subscribe((response) => {

        this.geoR = response;
        this.mylat = this.geoR.results[0].geometry.location.lat;
        this.mylng = this.geoR.results[0].geometry.location.lng;


        

  
        

        this.url ="https://eventang.wl.r.appspot.com/search/keyword/"+this.keywords+"/radius/"+this.radius+"/typeunit/"+this.unit+"/lat/"+this.mylat+"/lng/"+this.mylng+"?segmentId="+this.segmentId;
        this.http.get(this.url)
        .subscribe((response) => {
          
          this.showProgressBar = true; 
          this.respExtra = response;

          

        });
        this.http.get(this.url)
        .subscribe((response) => {
          this.wait(500);
          this.showProgressBar = false;  
          
        });




      })
      }
      else
      {
        
  

        this.url ="https://eventang.wl.r.appspot.com/search/keyword/"+this.keywords+"/radius/"+this.radius+"/typeunit/"+this.unit+"/lat/"+this.mylatO+"/lng/"+this.mylngO+"?segmentId="+this.segmentId;
      
        this.http.get(this.url)
        .subscribe((response) => {


          
          
          this.showProgressBar = true; 
          this.respExtra = response;


          



        });
        this.http.get(this.url)
        .subscribe((response) => {
          this.wait(500);
          this.showProgressBar = false;  
          
        });


        

      }
    }
    document.getElementById('fList').setAttribute('style','display:none');
    this.starItems = [];
    for(var i=0;i<localStorage.length;i++)
    {
      this.starItems[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    document.getElementById("responseBlock").setAttribute('style','display:block');

    document.getElementById('fList').setAttribute('style','display:none');
    document.getElementById('responseBlock').setAttribute('style','display:block');

    document.getElementById("fav").style.cssText = "background: none; color: #007dff;border: none";
    document.getElementById("res").style.cssText = "background: #007bff; color: white;border: 5px";

    
  }





  getAinfo(arr):void{

    if(arr!=undefined){
      if(this.eventCategory=='Music' || this.eventCategory=='Arts & Theatre')
      {
        for(var i=0;i<arr.length;i++)
        {
          this.url ="https://eventang.wl.r.appspot.com/searchArtist/"+arr[i].name;
          this.http.get(this.url)
          .subscribe((response) => {

          
          this.artInfo.push(response);
        });
        }
      }



    }
   

  }





  getEinfo(id:string):void{
    this.url ="https://eventang.wl.r.appspot.com/searchDetails/"+id;
    this.http.get(this.url)
    .subscribe((response) => {
      this.resD = response;
      this.currentEvent = this.resD;
      this.eventCategory = this.resD.classifications[0].segment.name;
      this.lat = +this.resD._embedded.venues[0].location.latitude;
      this.lng = +this.resD._embedded.venues[0].location.longitude;
      this.time = this.resD.dates.start.localDate;
      this.time = moment(this.time).format('MMM DD, YYYY');

     
      this.getAinfo(this.resD._embedded.attractions); 
      this.getVmap(this.resD._embedded.venues[0].name);
      this.getArtImg(this.resD._embedded.attractions); 
      document.getElementById("infoBlock").setAttribute('style','display:block');
      document.getElementById("responseBlock").setAttribute('style','display:none');
      document.getElementById("fList").setAttribute('style','display:none');
      document.getElementById('details').removeAttribute('disabled');  
      document.getElementById('details2').removeAttribute('disabled');  
    });
  }






  getVmap(keyword:string):void{
    this.url ="https://eventang.wl.r.appspot.com/searchVenue/"+keyword;
    this.http.get(this.url)
    .subscribe((response) => {
      this.vDict = response;
    });
  }

  getArtImg(arr):void{

    if(arr!=undefined){
      for(var i=0;i<arr.length;i++)
        {
          this.url ="https://eventang.wl.r.appspot.com/img/"+arr[i].name;
          this.http.get(this.url)
          .subscribe((response) => {
            this.artistImages.push(response);
          });
        }

    }
  }




  currentLocation():void{
    document.getElementById('otherLocation').setAttribute('disabled','disabled');
    document.getElementById('otherLocation').setAttribute('style','border:none');
    this.locationString=null;
  }

  otherLocation():void{
    document.getElementById('otherLocation').removeAttribute('disabled');
  }

  clform():void{
    this.locationString=null;
    var resetForm = <HTMLFormElement>document.getElementById('fmine');
    resetForm.reset();
    this.locationRadio = "gloc";

    document.getElementById('otherLocation').setAttribute('disabled','disabled');
    document.getElementById("responseBlock").setAttribute('style','display:none');
    document.getElementById("infoBlock").setAttribute('style','display:none');
    document.getElementById("fList").setAttribute('style','display:none');
    this.respExtra = null;
    this.resD = null;
    this.artInfo = null;
    this.artistImages = null;
    this.vDict = null;

    this.sortCategory = 'default';
    this.type = "all";
    this.radius = 10;
    this.unit = "miles";
    this.sortOrder = 'ascending';
    this.segmentId ="";
    this.searchTerm.markAsUntouched();
    this.searchTerm.markAsPristine();
    this.otherLoc.markAsUntouched();
    this.otherLoc.markAsPristine();

    this.showProgressBar = false;
    this.favor=false;

    document.getElementById("fav").style.cssText = "background: none; color: #007dff;border: none";
    document.getElementById("res").style.cssText = "background: #007bff; color: white;border: 5px";
  }



 

  viewSeats(url):void{
    document.getElementById('seatMapping').setAttribute('style','display:block;');
    document.getElementById("img01").setAttribute('src',url);
  }

  closeModal():void{
    document.getElementById('seatMapping').setAttribute('style','display:none');
  }

  favorite(event,id):void{
    if(!localStorage.getItem(event.id))
    {
      localStorage.setItem(event.id,JSON.stringify(event));
      

    }
    else
    {
      
      localStorage.removeItem(event.id);

    }
    this.starItems = [];
    for(var i=0;i<localStorage.length;i++)
    {
      this.starItems[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  this.localStorageCopy = localStorage;
  }

  fShowing():void{
    this.starItems = [];
    for(var i=0;i<localStorage.length;i++)
    {
      this.starItems[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    document.getElementById('fList').setAttribute('style','display:block');
    document.getElementById('responseBlock').setAttribute('style','display:none');
    document.getElementById('infoBlock').setAttribute('style','display:none');

    this.favor=true;



    




    document.getElementById("res").style.cssText = "background: none; color: #007dff;border: none";
    document.getElementById("fav").style.cssText = "background: #007bff; color: white;border: 5px";
    
    

  }

  resultsView():void{
    this.favor=false;

    document.getElementById('fList').setAttribute('style','display:none');
    document.getElementById('responseBlock').setAttribute('style','display:block');

    document.getElementById("fav").style.cssText = "background: none; color: #007dff;border: none";
    document.getElementById("res").style.cssText = "background: #007bff; color: white;border: 5px";



  }

  displayList():void{
    document.getElementById("infoBlock").setAttribute('style','display:none');



    if(this.favor==false){
      document.getElementById("responseBlock").setAttribute('style','display:block');
    }else{
      document.getElementById('fList').setAttribute('style','display:block');

    }
  }

  displayDetails():void{

    document.getElementById('responseBlock').setAttribute('style','display:none');
    document.getElementById('infoBlock').setAttribute('style','display:block');
  }

  displayDetails2():void{
    document.getElementById('fList').setAttribute('style','display:none');
    document.getElementById('infoBlock').setAttribute('style','display:block');
  }


}
