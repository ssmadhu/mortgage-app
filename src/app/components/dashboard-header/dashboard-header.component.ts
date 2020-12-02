import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { zipcodeRegex } from 'src/app/models/RegexPatterns';
import { MortgageService } from '../../services/mortgage/mortgage.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class DashboardHeaderComponent implements OnInit {

  public searchForm: FormGroup;
  @Output() search = new EventEmitter<FormGroup>();
  @Output() setValues = new EventEmitter<{ zipCode?: number, debt?: number, income?: number }>();
  constructor() {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      mortgageType: new FormControl('purchase', Validators.required),
      zipCode: new FormControl('33323', [Validators.required, Validators.pattern(zipcodeRegex)]),
      purchasePrice: new FormControl('500000'),
      propertyValue: new FormControl('500000'),
      loanAmount: new FormControl('4000'),
      downPayment: new FormControl('1000'),
      creditScore: new FormControl('740+'),
      loanTerm: new FormControl('30'),
      propertyType: new FormControl('singleFamily'),
      monthlyIncome: new FormControl('6000'),
      debt: new FormControl('1500')
    });
    this.emitValues();
  }
  onSearch(): void {
    this.search.emit(this.searchForm);
    this.emitValues();
  }

  emitValues(): void {
    this.setValues.emit({
      zipCode: this.searchForm.controls.zipCode.value,
      income: this.searchForm.controls.monthlyIncome.value,
      debt: this.searchForm.controls.debt.value
    });
  }
}
