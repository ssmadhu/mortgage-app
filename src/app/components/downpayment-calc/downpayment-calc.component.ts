import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-downpayment-calc',
  templateUrl: './downpayment-calc.component.html',
  styleUrls: ['./downpayment-calc.component.scss']
})
export class DownpaymentCalcComponent implements OnInit {

  @Input() cost: string;
  @Input() initalValue: string;
  constructor() { }

  ngOnInit(): void {
  }

}
