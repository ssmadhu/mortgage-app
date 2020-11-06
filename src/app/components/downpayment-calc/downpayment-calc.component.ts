import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-downpayment-calc',
  templateUrl: './downpayment-calc.component.html',
  styleUrls: ['./downpayment-calc.component.scss']
})
export class DownpaymentCalcComponent implements OnInit, OnChanges {

  @Input() cost: string;
  @Input() initalValue: string;
  public defaultDownPaymentRate = 2;
  public downpayment;
  public downpaymentControl;
  public downpaymentRateControl;
  currencyChars = new RegExp('[\.,]', 'g');

  constructor() { }

  ngOnInit(): void {
    this.calculateDownPayment();
  }
  ngOnChanges(): void {
    this.calculateDownPayment();
  }

  calculateDownPayment(): void {
    this.downpayment = (parseInt(this.cost.replace(this.currencyChars, ''), 10) * this.defaultDownPaymentRate) / 100;
    console.log(this.downpayment);
    this.downpaymentControl = new FormControl(this.downpayment);
    this.downpaymentRateControl = new FormControl(this.defaultDownPaymentRate);
  }

}
