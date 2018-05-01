import {Injectable} from '@angular/core';
import {timeout} from 'rxjs/operators/timeout';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class ConnectionService {
  currencyDataChanged = new Subject<object>()
  private currencyData = {};
  private timeframes = {};

  constructor(private http: HttpClient) {
  }

  getCurrencyData() {
    return Object.assign({}, this.currencyData);
  }

  getTimeframes() {
    return Object.assign({}, this.timeframes);
  }
  getTimeframeByKey(key: string) {
    return Object.assign({}, this.timeframes[key]);
  }

  setTimeframes(data: object) {
    const timeframesD1 = {}
    const timeframesH1 = {}
    const timeframesH4 = {}
    const timeframesM15 = {}
    _.forEach(data['D1'], (key, value) => {
      timeframesD1[key['Key']] = key['Value'];
    })
    _.forEach(data['H1'], (key, value) => {
      timeframesH1[key['Key']] = key['Value'];
    })
    _.forEach(data['H4'], (key, value) => {
      timeframesH4[key['Key']] = key['Value'];
    })
    _.forEach(data['M15'], (key, value) => {
      timeframesM15[key['Key']] = key['Value'];
    })
    this.timeframes['D1'] = timeframesD1;
    this.timeframes['H1'] = timeframesH1;
    this.timeframes['H4'] = timeframesH4;
    this.timeframes['M15'] = timeframesM15;
  }

  setCurrencyData(data: object) {
    this.currencyData = data;
  }

  emitCurrencyChanges() {
    console.log('data changed')
    this.currencyDataChanged.next(this.currencyData);
  }

  async fetchCurrencyData() {
    this.http.get('http://91.194.90.62:20019/fxservice/strongweak')
      .subscribe(data => {
        this.setCurrencyData(data)
        this.setTimeframes(data);
        this.emitCurrencyChanges();
        return true;
      });
  }
}
