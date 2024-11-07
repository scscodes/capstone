import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import {HighchartsService} from './highcharts.service';
import Highcharts from 'highcharts';

interface chartLabels{
  title: string;
  xAxis: string;
  yAxis: string;
}

@Component({
  selector: 'app-highcharts',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  template:`
    <div [id]="chartId" style="width: 100%; height: 400px;"></div>
  `,
  styleUrl: './highcharts.component.scss'
})
export class HighchartsComponent implements AfterViewInit, OnChanges{
  @Input() chartId: string = '';
  @Input() chartType: string = 'line'; // Allows setting chart type dynamically
  @Input() chartLabels: chartLabels = { title: '', xAxis: '', yAxis: '' }
  @Input() seriesData: any[] = []; // Accepts various series configurations
  @Input() categories: string[] = []; // Dynamic categories for X-axis
  Highcharts: typeof Highcharts;
  chart: Highcharts.Chart | null = null;

  constructor(private highchartsService: HighchartsService) {
    this.Highcharts = this.highchartsService.getInstance();
  }

  ngAfterViewInit() {
    this.initChart();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes['seriesData'] && !changes['seriesData'].firstChange) {
      // Update the series data in the chart directly to avoid re-rendering the entire chart
      this.seriesData.forEach((series, index) => {
        if (this.chart!.series[index]) {
          this.chart!.series[index].setData(series.data, true); // true to redraw
        }
      });
    }
  }

  initChart() {
    this.chart = this.Highcharts.chart(this.chartId, {
      chart: { type: this.chartType },
      title: { text: this.chartLabels.title },
      xAxis: { categories: this.categories, title: { text: this.chartLabels.xAxis} },
      yAxis: { title: { text: this.chartLabels.yAxis } },
      tooltip: { shared: true },
      series: this.seriesData.map(series => ({ ...series })),
    });
  }

}
