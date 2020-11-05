export interface IMortgageService {
  url: string;
  params: {
    customerId: string;
    thirdPartyName: string;
    licenseKey: string;
    emailAddress: string;
    request_id: string;
  };
}

export interface IMortgageDetails {
  loanAmount: string;
  loanPeriod?: string;
}
