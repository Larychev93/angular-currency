import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currencyData = null
  timeframes = {}

  constructor(private connectionService: ConnectionService) { }
  fetchData() {
    this.connectionService.fetchCurrencyData().then(resp => {
      this.currencyData = this.connectionService.getCurrencyData();
      this.timeframes = this.connectionService.getTimeframes();
    });
  }
  ngOnInit() {
    console.log('try github pages')
    this.fetchData()
    this.connectionService.currencyDataChanged
      .subscribe(
        (data: object) => {
          this.currencyData = this.connectionService.getCurrencyData();
          this.timeframes = this.connectionService.getTimeframes();
        }
      );
      setInterval(() => {
        this.fetchData();
      }, 60 * 3000);
    // IntervalObservable.create(2000)
    //   .subscribe(() => {
    //     this.currencyData = this.connectionService.fetchCurrencyData()
    //       .subscribe(data => this.currencyData = data,
    //         error => console.log(error) // error path
    //       );
    //   });
  }

}
