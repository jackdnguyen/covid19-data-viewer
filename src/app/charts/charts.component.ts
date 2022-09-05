import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { TableService } from '../table_services';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  federal = true;
  provincial = true;
  regional = false;

  view: [number, number] = [700, 600];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#bea989', '#bb5a5a', '#5e476d'],
  };
  colorScheme2: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#bea989', '#88765a'],
  };
  //pie
  showLabels = true;
  multi: any[] = [];
  single: any[] = [];
  regionalSingle: any[] = [];

  constructor(private ts:TableService) { }

  ngOnInit(): void {
    this.ts.dataChange.subscribe(e => this.dataChange());
  }
  async dataChange(){
    await this.delay(1000)
    let form = this.ts.getForm()
    this.federal = form.federal
    this.provincial = form.provincial
    this.regional = form.regional

    let data: any[] = this.ts.getTableData()
    let singleTemp: any[] = []
    let multiTemp: any[] = []
    let regionalTemp: any[] = []

    if(!form.federal || !form.provincial){
      this.view = [1200, 600]
    }
    if(form.federal && form.provincial){
      this.view = [700, 600]
    }

    if(form.federal){
      const i = data.findIndex(e => e.country === "Canada")
      let newCases = {
        "name":"New Cases",
        "value": data[i].cases ? data[i].cases:0
      }
      let newDeaths = {
        "name":"New Deaths",
        "value": data[i].deaths
      }
      let newHospitalized = {
        "name":"New Hospitalized",
        "value": data[i].hospitalized
      }
      singleTemp.push(newCases);
      singleTemp.push(newDeaths);
      singleTemp.push(newHospitalized);
    }
    console.log(singleTemp)
    this.single = singleTemp

    if(form.provincial){
      for(let i=0; i<data.length;i++){
        if(data[i].country === undefined && data[i].regionCode === undefined){
          let obj = {
            "name": "Repatriated",
            "series": [
              {
                "name": "New Cases",
                "value": 0
              },
              {
                "name": "New Deaths",
                "value": 0
              },
              {
                "name": "New Recovered",
                "value": 0
              }
            ]
          }
          obj.name = data[i].province
          obj.series[0].value = data[i].cases
          obj.series[1].value = data[i].deaths
          obj.series[2].value = data[i].hospitalized
          multiTemp.push(obj)
          if(multiTemp.length == 13){
            console.log(multiTemp)
            break
          }
        }
      }
      this.multi = multiTemp
    }
    if(form.regional){
      for(let i=0; i<data.length; i++){
        if(data[i].regionCode != undefined){
          let obj = {
            "name": data[i].regionCode,
            "value": data[i].cases
          }
          regionalTemp.push(obj)
        }
      }
      this.regionalSingle = regionalTemp
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
