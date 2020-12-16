import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMortgageDetails, IMortgageService } from '../../models/IMortgageService';
import { switchMap } from 'rxjs/operators';
import { Parser } from 'xml2js';
import { ZipCode, lookup } from 'zipcodes';
import { RatesResponse } from 'src/app/models/RatesResponse';
@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor(
    public http: HttpClient,
    @Inject('mortgageAPI') public mortgageApi: IMortgageService,
    @Inject('zillowAPI') public zillowApi: { url: string, partnerId: string }) {
    console.log(mortgageApi);
  }

  public getLatLongFromZipCode(zipCode: number): ZipCode {
    return lookup(zipCode);
  }

  public getMortgageDetails(values: IMortgageDetails): Observable<any> {
    return this.http.get(this.mortgageApi.url,
      {
        responseType: 'text',
        params:
        {
          ...this.mortgageApi.params,
          loanProduct1: '30 year fixed',
          loan_amount: values.loanAmount,
          pmi: values.downPayment,
          showAllLockPeriods: '1'
        }
      }).pipe(
        switchMap(async xml => await this.parseXmlToJson(xml))
      );
  }
  async parseXmlToJson(xml): Promise<any> {
    return await new Parser({ explicitArray: false, mergeAttrs: true }).parseStringPromise(xml)
      .then(response => response);
  }

  public getRatesZillow(loanType: string = 'Conventional'): Observable<RatesResponse> {
    return this.http
      .get<RatesResponse>
      (`${this.zillowApi.url}/getRates`, {
        params: {
          partnerId: this.zillowApi.partnerId,
          includeCurrentRate: 'true',
          'queries.1.loanType': loanType,
          durationDays: '365',
          'queries.1.creditScoreBucket': 'High',
          aggregation: 'Daily'
        }
      }
      );
  }
}
