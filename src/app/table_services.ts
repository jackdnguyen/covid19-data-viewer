import { Injectable } from '@angular/core';
import { TableData, TableObject } from './object_interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    form: TableObject = {
        federal: true,
        provincial: true,
        regional: false,
        newCases: true,
        cumulativeCases: false,
        newDeaths: true,
        cumulativeDeaths: false,
        newHospitalizations: true,
        cumulativeHospitalizations: false,
        startDate: "2022-03-03",
        endDate: "2022-03-03"
    }

    tableData = [];

    dataUpdate = new BehaviorSubject({
        dataChange:false
    });
    dataChange = this.dataUpdate.asObservable();

    errorObj = {
        errorMessage:"",
        start:false,
        end:false
    }
    error = new BehaviorSubject({
        error:false
    })
    hasError = this.error.asObservable();


    ngOnInit(): void { }

    updateForm(form: TableObject) {
        this.form = form;
        console.log("Updated Service Form");
    }
    getForm(){
        return this.form;
    }
    updateTableData(data:any){
        this.tableData = data;
        console.log("table Service")
        console.log(data);
        this.dataUpdate.next({dataChange:true});
    }
    getTableData(){
        return this.tableData;
    }
    errorCall(message:string, start:boolean, end:boolean){
        this.errorObj.errorMessage = message
        this.errorObj.start = start
        this.errorObj.end = end
        this.error.next({error:true})
    }
    getError(){
        return this.errorObj
    }
}
