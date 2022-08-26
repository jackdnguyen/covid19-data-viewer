import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableObject, TableData, API  } from '../object_interface';
import { TableService } from '../table_services';

@Component({
  selector: 'app-fetch-api',
  templateUrl: './fetch-api.component.html',
  styleUrls: ['./fetch-api.component.css']
})
export class FetchApiComponent implements OnInit {
  constructor(private http:HttpClient,private ts:TableService) { }

  ngOnInit(): void {
    console.log("hi");
    let urlDefault = 'https://api.opencovid.ca/summary?geo=pt&date=2022-03-03&after=2022-03-03&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json'
    this.http.get<API>(urlDefault).subscribe((json) =>{
      console.log(json.data);
    })
  }
  fetchAPI(){
    let form = this.ts.getForm()
    let url = `https://api.opencovid.ca/summary?geo=pt&after=${form.startDate}&before=${form.endDate}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`
    let tableData: any = [];
    this.http.get<API>(url).subscribe((json) => {
      json.data.forEach((e:any) => {
        let obj:TableData = {
          province: e.region,
          cases: e.cases_daily,
          allCases: e.cases,
          deaths: e.deaths_daily,
          allDeaths: e.deaths,
          hospitalized: e.hospitalizations_daily,
          allHospitalized: e.hospitalizations,
        }
        tableData.push(obj);
      })
      this.ts.updateTableData(tableData);
    })
  }
}
