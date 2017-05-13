import { Component } from '@angular/core';
import { ConverterService } from "app/converter.service";
import { Coin } from "app/model/coin";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConverterService]
})
export class AppComponent {
  title = 'List of Coins';
  coins: Coin[];
  selectedCoin: Coin;
  selectedBaseCoin: string;

  constructor(private coinService: ConverterService) { }

  getAllCoins(): void {
    this.coinService.getAllCoins().then(coins => this.coins = coins);
  }

  ngOnInit(): void {
    this.getAllCoins();
  }

  onSelect(coin: Coin): void {
    this.selectedCoin = coin;
    console.log(this.selectedCoin);
  }

  update(): void {
    console.log(this.selectedBaseCoin);
  }
}
