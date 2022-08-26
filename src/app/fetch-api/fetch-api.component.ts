import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-api',
  templateUrl: './fetch-api.component.html',
  styleUrls: ['./fetch-api.component.css']
})
export class FetchApiComponent implements OnInit {

  constructor(private http:HttpClient,) { }

  ngOnInit(): void {
    console.log("hi");
    let urlDefault = 'https://api.opencovid.ca/summary?geo=pt&date=2022-03-03&after=2022-03-03&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json'
    this.http.get<Object>(urlDefault).subscribe((data) =>{
      console.log(data);
    })
  }

}
