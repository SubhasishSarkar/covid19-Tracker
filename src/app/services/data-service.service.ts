import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { from } from 'rxjs';
import { GlobalDataSummary } from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl=`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-18-2020.csv`
  constructor(private http : HttpClient) {}

   getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
      map(result =>{
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0 , 1);
        rows.forEach(row => {
          let cols =row.split(/,(?=\S)/)
          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            recovered : +cols[9],
            death : +cols[8],
            active : +cols[10]
          };
          let temp : GlobalDataSummary = raw[cs.country];

          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.death = cs.death + temp.death
            temp.recovered = cs.recovered + temp.recovered
            raw[cs.country] = temp;
          }else{
            raw[cs.country] = cs;
          } 
        })
        //console.log(raw);
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}
