import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalDeath = 0;
  totalRecovered = 0;
  totalActive = 0;
  constructor(private servise : DataServiceService) { }

  ngOnInit(): void {
    this.servise.getGlobalData().subscribe(result =>{
      this.data = result;
      this.data.forEach(cs =>{
        this.countries.push(cs.country)
      })
    })
  }
  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs =>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeath = cs.death
        this.totalRecovered = cs.recovered
      }
    })
  }
}
