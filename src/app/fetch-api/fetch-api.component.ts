import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableObject, TableData, API } from '../object_interface';
import { TableService } from '../table_services';

@Component({
  selector: 'app-fetch-api',
  templateUrl: './fetch-api.component.html',
  styleUrls: ['./fetch-api.component.css']
})
export class FetchApiComponent implements OnInit {
  constructor(private http: HttpClient, private ts: TableService) { }

  ngOnInit(): void {
    this.fetchAPI();
  }
  fetchAPI() {
    let form = this.ts.getForm()
    let start = form.startDate.replace(/\-/g, "")
    let end = form.endDate.replace(/\-/g, "")

    if (this.dateValidator(parseInt(start), parseInt(end))) {

      let url = `https://api.opencovid.ca/summary?geo=pt&after=${form.startDate}&before=${form.endDate}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`
      let tableData: any = [];
      this.http.get<API>(url).subscribe((json) => {
        json.data.forEach((e: any) => {
          let obj: TableData = {
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
    } else{
      console.log("ERROR!!")
    }
  }
  dateValidator(start: number, end: number) {
    if(start > end){
      console.log("error: start > end")
      return false
    } 
    if(start < 20200101){
      console.log("error: start must be >= 2020-01-01")
      return false
    }
    if(end < 20200101){
      console.log("error: end must be >= 2020-01-01")
      return false
    }
    if(start == null || end == null){
      console.log("invalid input")
      return false
    }
    let today = new Date().toLocaleDateString('en-CA')
    today = today.replace(/\-/g, "")
    if(end > parseInt(today)){
      console.log("error: end > today")
      return false
    }
    return true
  }
}
