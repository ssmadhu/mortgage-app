import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class GraphCardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [ 10000], label: 'Income' },
    { data: [ -5000], label: 'Debt' }
  ];

  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

  updateChart(debt: number, income: number): void {
    this.barChartData = [{ data: [ income], label: 'Income' },
    { data: [debt], label: 'Debt' }];
  }
}
