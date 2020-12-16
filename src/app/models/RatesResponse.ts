export class RatesResponse {
  public rates: {
    default?: {
      currentRate: any;
      query: any;
      samples: Array<{apr: number, rate: number, time: string, volume: number}>;
    },
    1?: {
      currentRate: any;
      query: any;
      samples: Array<{apr: number, rate: number, time: string, volume: number}>;
    }
  };
}
