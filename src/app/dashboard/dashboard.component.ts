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

  /**
   * Fetching data from service and param to show toaster only after update
   * @param setToaster
   */
  fetchData(setToaster) {
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
     /**
     * Create interval for fetching data, period equals to 5 minutes
     * @type {NodeJS.Timer}
     */
      this.intervalFunctiion = setInterval(() => {
        this.fetchData(true);
      }, this.period);
  }
  ngOnDestroy() {
    /**
     * ClearInterval in angular lifehook
     */
    if (this.intervalFunctiion) {
      clearInterval(this.intervalFunctiion);
    }
  }
}
