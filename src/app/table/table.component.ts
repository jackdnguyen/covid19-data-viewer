import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, NgModel } from '@angular/forms'

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
  regional: boolean = false;
  newCases: boolean = true;
  cumulativeCases: boolean = false;
  newDeaths: boolean = true;
  cumulativeDeaths: boolean = false;
  newRecovered: boolean = true;
  cumulativeRecovered: boolean = false;
  startDate: string = '';
  endDate: string = '';

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      federal: new FormControl(false),
      provincial: new FormControl(true),
      regional: new FormControl(false),
      newCases: new FormControl(true),
      cumulativeCases: new FormControl(false),
      newDeaths: new FormControl(true),
      cumulativeDeaths: new FormControl(false),
      newRecovered: new FormControl(true),
      cumulativeRecovered: new FormControl(false),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  }
  columnChange() {
    this.editTable(this.form.value);
  }
  editTable(table: any) {
    console.log(table)
    this.federal = table.federal
    this.provincial = table.provincial
    this.regional = table.regional
    this.newCases = table.newCases
    this.cumulativeCases = table.cumulativeCases
    this.newDeaths = table.newDeaths
    this.cumulativeDeaths = table.cumulativeDeaths
    this.newRecovered = table.newRecovered
    this.cumulativeRecovered = table.cumulativeRecovered
    this.startDate = table.startDate
    this.endDate = table.endDate
  }
  dataChange() {
  }
}
