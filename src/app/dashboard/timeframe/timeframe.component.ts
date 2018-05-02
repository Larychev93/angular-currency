import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import * as CanvasJS from '../../shared/CanvasJS';
import * as _ from 'lodash';
@Component({
  selector: 'app-timeframe',
  templateUrl: './timeframe.component.html',
  styleUrls: ['./timeframe.component.scss']
})
export class TimeframeComponent implements OnInit {
  @Input() timeFrameKey: string;
  @ViewChild('canvas') canvasEl: ElementRef
  timeframe = {}

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() {
    /**
     * Get timeframe from service by key, then create dynamic id for init canvasJS
     * @type {{} & any}
     */
    this.timeframe = this.connectionService.getTimeframeByKey(this.timeFrameKey);
    this.canvasEl.nativeElement.id = `canvas-${this.timeFrameKey}`
    this.connectionService.currencyDataChanged
      .subscribe(
        (data: object) => {
          this.timeframe = this.connectionService.getTimeframeByKey(this.timeFrameKey);
          this.initCanvasJs();
        }
      );
    this.initCanvasJs();
  }
  canvasClass() {
    return `canvas-${this.timeFrameKey}`;
  }
  initCanvasJs() {
    const dataPoints = []
    _.forEach(this.timeframe, (currencyValue, currencyKey) => {
      dataPoints.push({
        label: currencyKey,
        y: currencyValue
      });
    })
    //
    const chart = new CanvasJS.Chart(this.canvasClass(), {
      title: {
        text: ''
      },
      data: [
        {
          type: 'column',
          dataPoints: dataPoints
        }
      ]
    });

    chart.render();
  }

}
