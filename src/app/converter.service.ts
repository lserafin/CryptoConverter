import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Coin } from "app/model/coin";
import { Ticker } from "app/model/ticker";

@Injectable()
export class ConverterService {
  private tickerUrl = 'https://api.cryptonator.com/api/ticker/';
  private currenciesUrl = 'https://www.cryptonator.com/api/currencies/';

  constructor(private http: Http) { }

  getAllCoins(): Promise<Coin[]> {
    return this.http.get(this.currenciesUrl)
               .toPromise()
               .then(response => response.json().rows as Coin[])
               .catch(this.handleError);
  }
  
  convert(base: string, target: string): Promise<Ticker> {
    return this.http.get(`${this.tickerUrl}${base.toUpperCase()}-${target.toUpperCase()}`)
               .toPromise()
               .then(response => response.json().ticker as Ticker)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
