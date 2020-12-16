import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IMortgageService } from './models/IMortgageService';
import { ZipcodeValidatorDirective } from './directives/zipcode-validator/zipcode-validator.directive';
import { CurrencyFormatterDirective } from './directives/currency-formatter/currency-formatter.directive';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DownpaymentCalcComponent } from './components/downpayment-calc/downpayment-calc.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { GraphCardComponent } from './components/graph-card/graph-card.component';
import { ChartsModule } from 'ng2-charts';
import { RateCardComponent } from './components/rate-card/rate-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    ZipcodeValidatorDirective,
    CurrencyFormatterDirective,
    DownpaymentCalcComponent,
    LocationCardComponent,
    GraphCardComponent,
    RateCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ChartsModule
  ],
  providers: [DecimalPipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy}, {
    provide: 'mortgageAPI', useFactory: (): IMortgageService => {
      return {
        url: 'https://thirdparty.mortech-inc.com/mpg/servlet/mpgThirdPartyServlet',
        params: {
          customerId: 'travis',
          thirdPartyName: 'TravisEckhardt',
          licenseKey: 'MortechTravis',
          emailAddress: 'teckhardt@mortech-inc.com',
          request_id: '1'
        }
      };
    }
  }, {
      provide: 'zillowAPI', useValue: { url: `https://mortgageapi.zillow.com`, partnerId: 'RD-CRGGRHN'}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
