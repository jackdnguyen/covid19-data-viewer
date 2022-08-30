import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, NgModel } from '@angular/forms'
import { TableObject } from '../object_interface';
import { TableService } from '../table_services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form!: FormGroup;
  d: any;
  // Table Data
  federal: boolean = false;
  provincial: boolean = true;
  regional = false;
  newCases: boolean = true;
  cumulativeCases: boolean = false;
  newDeaths: boolean = true;
  cumulativeDeaths: boolean = false;
  newHospitalizations: boolean = true;
  cumulativeHospitalizations: boolean = false;
  startDate: string = '';
  endDate: string = '';

  location = false;
  stats = false;
  date = false;
  constructor(private ts:TableService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      federal: new FormControl(false),
      provincial: new FormControl(true),
      regional: new FormControl(false),
      newCases: new FormControl(true),
      cumulativeCases: new FormControl(false),
      newDeaths: new FormControl(true),
      cumulativeDeaths: new FormControl(false),
      newHospitalizations: new FormControl(true),
      cumulativeHospitalizations: new FormControl(false),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
    this.ts.dataChange.subscribe(e => this.dataChange());
  }
  columnChange() {
    this.editTable(this.form.value);
    this.ts.updateForm(this.form.value);
  }
  editTable(table: any) {
    console.log(table)
    console.log(this.regional);
    this.federal = table.federal
    this.provincial = table.provincial
    this.regional = table.regional
    this.newCases = table.newCases
    this.cumulativeCases = table.cumulativeCases
    this.newDeaths = table.newDeaths
    this.cumulativeDeaths = table.cumulativeDeaths
    this.newHospitalizations = table.newHospitalizations
    this.cumulativeHospitalizations = table.cumulativeHospitalizations
    this.startDate = table.startDate
    this.endDate = table.endDate
  }
  dataChange() {
    console.log("Table Talking");
    this.d = this.ts.getTableData();
  }
  showLocation(){
    this.location = !this.location;
  }
  showStats(){
    this.stats = !this.stats;
  }
  showDate(){
    this.date = !this.date;
  }
}
