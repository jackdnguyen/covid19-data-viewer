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
    let valid = this.dateValidator(form.startDate, form.endDate)
    let tableData: any = [];

    if (valid) {
      if (form.federal) {
        let url = `https://api.opencovid.ca/summary?geo=can&after=${form.startDate}&before=${form.endDate}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`
        let obj: any[] = []
        this.http.get<API>(url).subscribe((json) => {
          json.data.forEach((e: any) => {
            if (obj.length == 0) {
              let dataObj: TableData = {
                country: 'Canada',
                cases: e.cases_daily,
                allCases: e.cases,
                deaths: e.deaths_daily,
                allDeaths: e.deaths,
                hospitalized: e.hospitalizations_daily,
                allHospitalized: e.hospitalizations,
              }
              obj.push(dataObj)
            } else {
              obj[0].cases += e.cases_daily
              obj[0].allCases = e.cases
              obj[0].deaths += e.deaths_daily
              obj[0].allDeaths = e.deaths
              obj[0].hospitalized += e.hospitalizations_daily
              obj[0].allHospitalized = e.hospitalizations
            }
          })
          tableData.push(obj[0])
          this.ts.updateTableData(tableData)
        })
      }
      if (form.provincial) {
        let url = `https://api.opencovid.ca/summary?geo=pt&after=${form.startDate}&before=${form.endDate}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`
        let dict: any[] = []
        this.http.get<API>(url).subscribe((json) => {
          json.data.forEach((e: any) => {
            let dictObj = {
              key: '',
              obj: {}
            }
            let obj: TableData = {
              province: e.region,
              cases: e.cases_daily,
              allCases: e.cases,
              deaths: e.deaths_daily,
              allDeaths: e.deaths,
              hospitalized: e.hospitalizations_daily,
              allHospitalized: e.hospitalizations,
            }
            const i = dict.findIndex(e => e.key === obj.province)
            if (i > -1) {
              dict[i].obj.cases += obj.cases
              dict[i].obj.allCases = obj.allCases
              dict[i].obj.deaths += obj.deaths
              dict[i].obj.allDeaths = obj.allDeaths
              dict[i].obj.hospitalized += obj.hospitalized
              dict[i].obj.allHospitalized = obj.allHospitalized
            } else {
              dictObj.key = obj.province!
              dictObj.obj = obj
              dict.push(dictObj)
            }
          })
          for (let i = 0; i < dict.length; i++) {
            tableData.push(dict[i].obj)
          }
          this.ts.updateTableData(tableData)
        })
      }
      if (form.regional) {
        let url = `https://api.opencovid.ca/summary?geo=hr&after=${form.startDate}&before=${form.endDate}&fill=true&version=true&pt_names=short&hr_names=short&fmt=json`
        let dict: any[] = []
        this.http.get<API>(url).subscribe((json) => {
          json.data.forEach((e: any) => {
            let dictObj = {
              key: '',
              obj: {}
            }
            let obj: TableData = {
              regionCode: e.sub_region_1,
              province: e.region,
              cases: e.cases_daily,
              allCases: e.cases,
              deaths: e.deaths_daily,
              allDeaths: e.deaths,
            }
            const i = dict.findIndex(e => e.key === obj.regionCode)
            if (i > -1) {
              dict[i].obj.cases += obj.cases
              dict[i].obj.allCases = obj.allCases
              dict[i].obj.deaths += obj.deaths
              dict[i].obj.allDeaths = obj.allDeaths
            } else {
              dictObj.key = obj.regionCode!
              dictObj.obj = obj
              dict.push(dictObj)
            }
          })
          for (let i = 0; i < dict.length; i++) {
            tableData.push(dict[i].obj)
          }
          this.ts.updateTableData(tableData)
        })
      }
    } else {
      console.log("ERROR!!")
    }
  }
  dateValidator(startString: string, endString: string) {

    console.log(startString)
    console.log(endString)

    let startArr = startString.split("-")
    let endArr = endString.split("-")
    let flag = false;

    if (startArr.length != 3 && endArr.length != 3) {
      this.ts.errorCall("[!] Format YYYY-MM-DD", true, true)
      flag = true;
    } else if (startArr.length != 3 && endArr.length == 3) {
      this.ts.errorCall("[!] Format YYYY-MM-DD", true, false)
      flag = true;
    } else if (startArr.length == 3 && endArr.length != 3) {
      this.ts.errorCall("[!] Format YYYY-MM-DD", false, true)
      flag = true;
    }
    if (flag) return false;

    if (parseInt(startArr[2]) > 31 && parseInt(endArr[2]) > 31) {
      this.ts.errorCall("[!] Invalid Day", true, true)
      flag = true
    } else if (parseInt(startArr[2]) > 31 && parseInt(endArr[2]) <= 31) {
      this.ts.errorCall("[!] Invalid Day", true, false)
      flag = true
    } else if (parseInt(startArr[2]) <= 31 && parseInt(endArr[2]) > 31) {
      this.ts.errorCall("[!] Invalid Day", false, true)
      flag = true
    }
    if (flag) return false;

    let start = parseInt(startString.replace(/\-/g, ""))
    let end = parseInt(endString.replace(/\-/g, ""))

    if (start > end) {
      this.ts.errorCall("[!] error: start > end", true, true)
      return false
    }
    if (start < 20200101 && end < 20200101) {
      this.ts.errorCall("error: must be >= 2020-01-01", true, true)
      flag = true
    } else if (start < 20200101 && end >= 20200101) {
      this.ts.errorCall("error: must be >= 2020-01-01", true, false)
      flag = true
    } else if (start >= 20200101 && end < 20200101) {
      this.ts.errorCall("error: must be >= 2020-01-01", false, true)
      flag = true
    }
    if (flag) return false;

    if (start == null && end == null) {
      this.ts.errorCall("[!] Invalid Input", true, true)
      flag = true
    } else if (start == null && end != null) {
      this.ts.errorCall("[!] Invalid Input", true, false)
      flag = true
    } else if (start != null && end == null) {
      this.ts.errorCall("[!] Invalid Input", false, true)
      flag = true
    }
    if (flag) return false;

    let today = new Date().toLocaleDateString('en-CA')
    today = today.replace(/\-/g, "")
    let todayNum = parseInt(today)

    if (start > todayNum && end > todayNum) {
      console.log("error: input > today")
      this.ts.errorCall("[!] error: input > today", true, true)
      flag = true
    } else if (start > todayNum && end <= todayNum) {
      this.ts.errorCall("[!] error: input > today", true, false)
      flag = true
    } else if (start <= todayNum && end > todayNum) {
      this.ts.errorCall("[!] error: input > today", false, true)
      flag = true
    }
    if (flag) return false;

    return true
  }
}
