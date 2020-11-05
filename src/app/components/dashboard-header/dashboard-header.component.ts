import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { zipcodeRegex } from 'src/app/models/RegexPatterns';
import { MortgageService } from '../../services/mortgage/mortgage.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  public searchForm: FormGroup;
  public resultSet = [];
  public dataSource;
  public displayedColumns: string[] = ['vendor', 'rate', 'monthlyPayment', 'upFrontCost'];
  constructor(private mortgageService: MortgageService) {
   }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      mortgageType: new FormControl('purchase', Validators.required),
      zipCode: new FormControl('33323', [Validators.required, Validators.pattern(zipcodeRegex)]),
      purchasePrice: new FormControl('500000'),
      downPayment: new FormControl('1000'),
      creditScore: new FormControl('740+'),
      loanTerm: new FormControl('30'),
      propertyType: new FormControl('singleFamily')
    });
  }
  onSearch(): void {
    const params = {
      loanAmount: this.searchForm.controls.purchasePrice.value
    };
    this.mortgageService.getMortgageDetails(params).subscribe(result => {
      this.resultSet = result.mortech.results;
      console.log(this.resultSet);
      this.dataSource = this.resultSet.map(x => {
        return {
          vendor: x?.quote?.vendor_product_name,
          rate: x?.quote?.quote_detail?.apr30,
          monthlyPayment: x?.quote?.quote_detail?.piti,
          upFrontCost: x?.quote?.quote_detail?.downPayment
        };
      });
    });
  }
}
