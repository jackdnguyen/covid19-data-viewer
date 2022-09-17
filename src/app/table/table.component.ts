import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, NgModel, Form } from '@angular/forms'
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
  federal: boolean = true;
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
  prevForm = {
    federal: true,
    provincial: true,
    regional: false,
    startDate: '',
    endDate: ''
  }

  constructor(private ts:TableService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      federal: new FormControl(true),
      provincial: new FormControl(true),
      regional: new FormControl(false),
      newCases: new FormControl(true),
      cumulativeCases: new FormControl(false),
      newDeaths: new FormControl(true),
      cumulativeDeaths: new FormControl(false),
      newHospitalizations: new FormControl(true),
      cumulativeHospitalizations: new FormControl(false),
      startDate: new FormControl('2022-03-03'),
      endDate: new FormControl('2022-03-03'),
      error: new FormControl('')
    })
    this.ts.dataChange.subscribe(e => this.dataChange());
    this.ts.hasError.subscribe(e => this.updateError())
    this.updateForm(this.form.value)
  }
  columnChange(flag: Number) {
    if(flag===1){
      //JSON.stringify(this.prevForm) == JSON.stringify(this.form.value)
      if(this.formCondition(this.form.value)){
        this.ts.fetchColor(0)
      } else {
        this.ts.fetchColor(1)
      }
    }
    this.editTable(this.form.value);
    this.ts.updateForm(this.form.value);
  }
  editTable(table: any) {
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
    this.updateForm(this.form.value)
    this.startErr = false
    this.endErr = false
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
    this.form.controls['error'].setValue(errorObj.errorMessage)
    this.startErr = errorObj.start
    this.endErr = errorObj.end
    this.hasError = true
  }
  updateForm(form:any){
    this.prevForm.federal = form.federal
    this.prevForm.provincial = form.provincial
    this.prevForm.regional = form.regional
    this.prevForm.startDate = form.startDate
    this.prevForm.endDate = form.endDate
  }
  formCondition(form:any){
    if( this.prevForm.federal == form.federal &&
        this.prevForm.provincial == form.provincial &&
        this.prevForm.regional == form.regional &&
        this.prevForm.startDate == form.startDate &&
        this.prevForm.endDate == form.endDate){
          return true
        } else{
          return false
        }
  }
}
