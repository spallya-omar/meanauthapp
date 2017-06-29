import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imgSrc: String;
  config = Config;

  constructor() { }

  ngOnInit() {
  this.imgSrc = "/assets/check.png";
  }

  toggleImage(i){
    this.config[i].isActive = !this.config[i].isActive;
  }
}

let Config = [
  {
    company: "Google",
    subtext: "Google Server",
    isActive: true
  },
  {
    company: "Facebook",
    subtext: "Facebook Server",
    isActive: false
  },
  {
    company: "GitHub",
    subtext: "GitHub Server",
    isActive: false
}
];
