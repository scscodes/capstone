import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  Highcharts = Highcharts;

  getInstance() {
    return this.Highcharts;
  }
}
