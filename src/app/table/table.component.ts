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
  startDate: string = '2022-03-03';
  endDate: string = '2022-03-03';

  location = false;
  stats = false;
  date = false;
  hasError = false;
  error = "[ ! ] start date too low";
  startErr = false;
  endErr = false;



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
      startDate: new FormControl('2022-03-03'),
      endDate: new FormControl('2022-03-03')
    })
    this.ts.dataChange.subscribe(e => this.dataChange());
    this.ts.hasError.subscribe(e => this.updateError())
  }
  columnChange() {
    console.log("Column Change");
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
  }
  dataChange() {
    console.log("Table Talking")
    this.hasError = false
    this.d = this.ts.getTableData()
    let form = this.ts.getForm()
    this.startDate = form.startDate
    this.endDate = form.endDate
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
  updateError(){
    let errorObj = this.ts.getError()
    this.error = errorObj.errorMessage
    this.startErr = errorObj.start
    this.endErr = errorObj.end
    this.hasError = true
  }
}
