import { Component } from '@angular/core';
import { ConverterService } from "app/converter.service";
import { Coin } from "app/model/coin";
import { Ticker } from "app/model/ticker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConverterService]
})
export class AppComponent {
  title = 'Crypto Convertor';
  coins: Coin[];
  selectedCoin: Coin;
  selectedBaseCoin: string;
  selectedTargetCoin: string;
  ticker: Ticker;

  constructor(private coinService: ConverterService) { }

  getAllCoins(): void {
    this.coinService.getAllCoins().then(coins => this.coins = coins);
  }

  convert(base: string,target: string): void {
    this.coinService.convert(base,target).then(ticker => this.ticker = ticker);
  }

  ngOnInit(): void {
    this.getAllCoins();
  }

  update(): void {
    if(this.selectedTargetCoin && this.selectedBaseCoin) {
      console.log(this.selectedBaseCoin + "->" + this.selectedTargetCoin);
      this.convert(this.selectedBaseCoin,this.selectedTargetCoin);
    }
    
  }
}
