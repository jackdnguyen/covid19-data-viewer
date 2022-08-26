export interface API {
    data: [],
    version: string,
}
export interface TableObject {
    federal: boolean,
    provincial: boolean,
    regional: boolean,
    newCases: boolean,
    cumulativeCases: boolean,
    newDeaths: boolean,
    cumulativeDeaths: boolean,
    newHospitalizations: boolean,
    cumulativeHospitalizations: boolean,
    startDate: string,
    endDate: string,
}
export interface TableData {
    country?:string,
    province?:string,
    regionCode?:string,
    cases:number,
    allCases:number,
    deaths:number,
    allDeaths:number,
    hospitalized:number,
    allHospitalized:number
}