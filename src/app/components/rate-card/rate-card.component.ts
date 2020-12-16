import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { forkJoin, Observable } from 'rxjs';
import { RatesResponse } from 'src/app/models/RatesResponse';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.scss']
})
export class RateCardComponent implements OnInit {
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public loaded: boolean;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          // display: false
          color: 'rgba(0,0,0,0.05)'
        }
      }],
      yAxes: [
        // {
        //   id: 'y-axis-0',
        //   position: 'left',
        // },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(255,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //   }
        // }
        {
          gridLines: {
            color: 'rgba(0,0,0,0.05)'
          }
        }

      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: '#f38e86',
      borderColor: '#f38e86',
      pointBackgroundColor: '#f38e86',
      pointBorderColor: '#f38e86',
      pointHoverBackgroundColor: '#f38e86',
      pointHoverBorderColor: '#f38e86'
    },
    { // dark grey
      backgroundColor: '#41719f',
      borderColor: '#41719f',
      pointBackgroundColor: '#41719f',
      pointBorderColor: '#41719f',
      pointHoverBackgroundColor: '#41719f',
      pointHoverBorderColor: '#41719f'
    },
    // { // red
    //   backgroundColor: 'rgba(255,0,0,0.3)',
    //   borderColor: 'red',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  constructor(public mortgageService: MortgageService) { }

  ngOnInit(): void {
    // forkJoin([
    //   this.mortgageService.getRatesZillow(),
    //   this.mortgageService.getRatesZillow('FHA'),
    //   this.mortgageService.getRatesZillow('VA')
    // ])
    this.mortgageService.getRatesZillow('FHA')
    .subscribe(result => {
      // const conventionalResult = result[0];
      const fhaResult = result;
      // const vaResult = result[2];
      this.lineChartData = [
        // {
        //   data: conventionalResult.rates[1].samples.map(x => x.rate),
        //   label: 'Conventional Rate',
        //   lineTension: 0,
        //   fill: false
        // },
        {
          data: fhaResult.rates[1].samples.map(x => x.rate),
          label: 'FHA Rate',
          lineTension: 0,
          fill: false
        }, {
          data: fhaResult.rates[1].samples.map(x => x.rate-0.25),
          label: 'Our Rate',
          lineTension: 0,
          fill: false
        }
        // {
        //   data: vaResult.rates[1].samples.map(x => x.rate),
        //   label: 'VA Rate',
        //   lineTension: 0,
        //   fill: false
        // }
      ];
      this.lineChartLabels = [...new Set(fhaResult.rates[1].samples
        .map(x => new Date(x.time))
        .map(x => this.months[x.getMonth()]))];
      this.loaded = true;
    });
  }

}
