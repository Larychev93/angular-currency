import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../shared/CanvasJS';
import {ConnectionService} from '../../services/connection.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-agreegate',
  templateUrl: './agreegate.component.html',
  styleUrls: ['./agreegate.component.scss']
})
export class AgreegateComponent implements OnInit {
  timeframes = {}
  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.timeframes = this.connectionService.getTimeframes();
    this.initCanvasJs()
    this.connectionService.currencyDataChanged
      .subscribe(
        (data: object) => {
          this.timeframes = this.connectionService.getTimeframes();
          this.initCanvasJs();
        }
      );
  }
  initCanvasJs() {
    const dataPoints = {}

    _.forEach(this.timeframes, (value, key) => {
      let xStep = 0
      _.forEach(value, (currencyValue, currencyKey) => {
        xStep += 20;
        if (!dataPoints[key]) {
          dataPoints[key] = [];
        }
        dataPoints[key].push({
          label: currencyKey,
          y: currencyValue,
          x: xStep
        });
      });
    });
    //
    const chart = new CanvasJS.Chart('canvas-agr', {
      title: {
        text: ''
      },
      data: [
        {
          type: 'scatter',
          name: 'H1',
          showInLegend: true,
          markerColor: 'red',
          dataPoints: dataPoints['H1']
        },
        {
          type: 'scatter',
          name: 'M15',
          markerColor: 'blue',
          showInLegend: true,
          dataPoints: dataPoints['M15']
        },
        {
          type: 'scatter',
          name: 'H4',
          showInLegend: true,
          markerColor: 'green',
          dataPoints: dataPoints['H4']
        },
        {
          type: 'scatter',
          name: 'D1',
          showInLegend: true,
          markerColor: 'purple',
          dataPoints: dataPoints['D1']
        }
      ]
    });

    chart.render();
  }

}
