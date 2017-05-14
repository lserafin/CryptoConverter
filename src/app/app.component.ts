import { Component } from '@angular/core';
import { ConverterService } from "app/converter.service";
import { Coin } from "app/model/coin";
import { Ticker } from "app/model/ticker";
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

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
  coinBaseCtrl: FormControl;
  coinTargetCtrl: FormControl;
  filteredBaseCoins: any;
  filteredTargetCoins: any;
  selectedItem: any;
  amount: number;

  constructor(private coinService: ConverterService) { 
    this.coinBaseCtrl = new FormControl();
    this.coinTargetCtrl = new FormControl();
    
    this.filteredBaseCoins = this.coinBaseCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterCoins(name));

    this.filteredTargetCoins = this.coinTargetCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterCoins(name));
  } 

  filterCoins(val: string) {
    return val ? this.coins.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
               : this.coins;
  }

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

  updateTarget(): void {
    if(this.selectedTargetCoin && this.selectedBaseCoin) {
      console.log(this.selectedBaseCoin + "->" + this.selectedTargetCoin);
      this.convert(this.selectedBaseCoin,this.selectedTargetCoin);
    }
    
  }
}
