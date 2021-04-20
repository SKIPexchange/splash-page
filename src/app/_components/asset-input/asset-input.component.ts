import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Asset } from 'src/app/_classes/asset';
import { AssetAndBalance } from 'src/app/_classes/asset-and-balance';
import { User } from 'src/app/_classes/user';
import { Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-asset-input',
  templateUrl: './asset-input.component.html',
  styleUrls: ['./asset-input.component.scss']
})
export class AssetInputComponent implements OnInit, OnDestroy {

  /**
   * Selected Asset
   */
  @Input() set selectedAsset(asset: Asset) {
    this._selectedAsset = asset;
  }
  get selectedAsset() {
    return this._selectedAsset;
  }
  @Output() selectedAssetChange = new EventEmitter<Asset>();
  private _selectedAsset: Asset;

  /**
   * Asset Unit
   */
  _assetUnit: number;
  @Input() set assetUnit(unit: number) {
    this._assetUnit = unit;
  }
  get assetUnit() {
    return this._assetUnit;
  }
  @Output() assetUnitChange = new EventEmitter<number>();

  @Input() label: string;
  @Input() disableInput?: boolean;
  @Input() disableUser?: boolean;
  @Input() disabledAssetSymbol: string;
  @Input() isWallet: boolean = false;

  /**
   * Wallet balance
   */
  @Input() set balance(bal: number) {
    console.log(bal)
    this._balance = bal;
  }
  get balance() {
    return this._balance;
  }
  _balance: number;

  @Input() hideMax: boolean;
  @Input() isSource: boolean;
  @Input() showBalance: boolean = true;
  @Input() showPrice: boolean = true;
  @Input() isDeposit: boolean = false;
  @Output() lunchMarket = new EventEmitter<null>();

  @Input() disabledMarketSelect: boolean;
  @Input() loading: boolean;
  @Input() error: boolean;
  @Input() set selectableMarkets(markets: AssetAndBalance[]) {
    this._selectableMarkets = markets;
  }
  get selectableMarkets() {
    return this._selectableMarkets;
  }
  _selectableMarkets: AssetAndBalance[];

  @Input() priceInput: number;
  assetPriceUSD: number;
  usdValue: number;
  user: User;
  subs: Subscription[];
  inputUsdValue: number;
  @Input() isGray: boolean;

  isTestnet: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isTestnet = (environment.network === 'testnet');
  }

  gotoApp() {
    console.log(this.isTestnet)
    if (!this.isGray) {
      if (this.isTestnet)
        window.location.href = 'https://asgard-exchange.vercel.app/';
      else
        window.location.href = 'https://vanahimex.vercel.app/';
    }
  }

  ngOnDestroy() {
  }

}
