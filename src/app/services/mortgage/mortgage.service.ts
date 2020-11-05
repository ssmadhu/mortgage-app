import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMortgageDetails, IMortgageService } from '../../models/IMortgageService';
import { switchMap } from 'rxjs/operators';
import { Parser } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor(public http: HttpClient, @Inject('mortgageAPI') public mortgageApi: IMortgageService) {
    console.log(mortgageApi);
   }

  public getMortgageDetails(values: IMortgageDetails): Observable<any> {
     return this.http.get(this.mortgageApi.url,
      { responseType: 'text',
        params:
        {...this.mortgageApi.params,
          loanProduct1: '30 year fixed' ,
          loan_amount: values.loanAmount,
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
}
