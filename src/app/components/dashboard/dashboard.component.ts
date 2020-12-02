import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { GraphCardComponent } from '../graph-card/graph-card.component';
import { LocationCardComponent } from '../location-card/location-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public resultSet = [];
  public dataSource;
  public displayedColumns: string[] = ['vendor', 'rate', 'monthlyPayment', 'upFrontCost'];

  @ViewChild('locationCard')  locationCard: LocationCardComponent;
  @ViewChild('graphCard')  graphCard: GraphCardComponent;

  public zipCode: number;
  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void {
    setTimeout(() =>  {
      this.zipCode = 55305;
    }, 5000);
  }

  ngAfterViewInit(): void {
    if (this.locationCard) {
      this.locationCard.zipcode = this.zipCode;
      this.locationCard.initCard();
    }
  }

  setValues($event): void {
    this.zipCode = $event.zipCode;
    if (this.locationCard) {
      this.locationCard.zipcode = this.zipCode;
      this.locationCard.initCard();
    }
    if (this.graphCard) {
      this.graphCard.updateChart(0, 0);
    }
  }

  onSearch(searchForm: FormGroup): void {
    const params = {
      loanAmount: searchForm.controls.purchasePrice.value,
      downPayment: searchForm.controls.downPayment.value
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
