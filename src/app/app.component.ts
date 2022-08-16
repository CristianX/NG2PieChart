import { Component, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  ChartOptions,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'graficos-ng2';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartPlugins = [DatalabelsPlugin];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      datalabels: {
        formatter: (value, context) => {
          // console.log('Value', value);
          // console.log('Context', context);
          const datapoints = context.chart.data.datasets[0].data;
          function totalSum(total: any, datapoint: any) {
            return total + datapoint;
          }
          const totalPercentage = datapoints.reduce(totalSum, 0);
          const percentageValue = ((value / totalPercentage) * 100).toFixed(0);

          return `${percentageValue}%`;
        },
      },
    },
    onClick: (evt: any, el, chart) => {
      console.log(
        'Active el list: ',
        chart.data.datasets[el[0].datasetIndex].label,
        chart.data.datasets[el[0].datasetIndex].data[el[0].index] //Regresa el value
      );
      console.log('El chart devuelto', chart.data.labels?.[el[0].index]); //Regresa el label
    },
  };
  public pieChartData: any = {
    labels: [
      'Estado Inicial',
      'Ejecutadas',
      'No Aplicables en el Tiempo',
      'No Ejectutadas',
      'En Ejecucion',
      'No Aplicables',
      'Cumplidas',
    ],
    datasets: [
      {
        data: [19, 15, 15, 5, 70, 4, 45],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  constructor() {}
}
