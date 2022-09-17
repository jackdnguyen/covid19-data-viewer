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

    changeColor = new BehaviorSubject({
        dataChange:false
    });
    change = false
    changeFetchColor = this.changeColor.asObservable();

    ngOnInit(): void { }

    updateForm(form: TableObject) {
        this.form = form;
    }
    getForm(){
        return this.form;
    }
    updateTableData(data:any){
        this.tableData = data;
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
    fetchColor(data:Number){
        if(data === 1){
            this.change = true
        } else if(data === 0){
            this.change = false
        }
        this.changeColor.next({dataChange:true})
    }
    returnChange(){
        return this.change
    }
}
