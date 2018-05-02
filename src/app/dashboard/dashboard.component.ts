import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currencyData = null
  timeframes = {}
  period = 300000;
  intervalFunctiion = null

  constructor(private connectionService: ConnectionService) { }
  fetchData(setToaster) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    console.log(`data was updated ${hours} - ${minutes}`)
    this.connectionService.fetchCurrencyData().then(resp => {
      this.currencyData = this.connectionService.getCurrencyData();
      this.timeframes = this.connectionService.getTimeframes();
      if (setToaster) {
        toastr.success('Your Data was updated!');
      }
    });
  }
  ngOnInit() {
    this.fetchData(false)
    this.connectionService.currencyDataChanged
      .subscribe(
        (data: object) => {
          this.currencyData = this.connectionService.getCurrencyData();
          this.timeframes = this.connectionService.getTimeframes();
        }
      );
      this.intervalFunctiion = setInterval(() => {
        this.fetchData(true);
      }, this.period);
  }
  ngOnDestroy() {
    if (this.intervalFunctiion) {
      clearInterval(this.intervalFunctiion);
    }
  }
}
