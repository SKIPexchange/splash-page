import { Component, OnInit } from '@angular/core';
import { Asset } from '../_classes/asset';
import { AssetAndBalance } from '../_classes/asset-and-balance';
import { MidgardService } from '../_services/midgard.service';
import { ThorchainPricesService } from '../_services/thorchain-prices.service';
import { environment } from './../../environments/environment';
import {
  getDoubleSwapOutput,
  getSwapSlip,
  getDoubleSwapSlip,
  PoolData,
  getValueOfAssetInRune,
  getValueOfRuneInAsset,
  getSwapOutput
} from '@thorchain/asgardex-util';
import { PoolDTO } from '../_classes/pool';
import { assetAmount, assetToBase, BaseAmount, baseAmount, bn } from '@xchainjs/xchain-util';

type inputs = {
  balance: number;
  amount: number;
  price: number;
  asset: Asset;
}

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  sourceInput: inputs;
  targetInput: inputs;

  gray: Array<boolean>;

  isTestnet: boolean;
  selectableMarkets: AssetAndBalance[];
  _sourceAssetTokenValue: BaseAmount;
  slip: number;


  poolDetailMap: {
    [key: string]: PoolDTO
  } = {};

  constructor(
    private midgardService: MidgardService,
    private thorchainPricesService: ThorchainPricesService
  ) {
    this.gray = [true,true,true,true,true,true,true];
    this.isTestnet = environment.network === 'testnet' ? true : false;
  }

  gotoApp() {
    if (this.isTestnet)
      window.location.href = 'https://asgard-exchange.vercel.app/';
    else
      window.location.href = 'https://vanahimex.vercel.app/';
  }

  ngOnInit(): void {
    this.sourceInput = {
      balance: 2.76,
      amount: 0.05,
      price: 20000,
      asset: new Asset('BTC.BTC'),
    }

    this.targetInput = {
      balance: 1000,
      amount: 600.12,
      price: 10,
      asset: new Asset('THOR.RUNE'),
    }

    this._sourceAssetTokenValue = assetToBase(assetAmount(this.sourceInput.amount));

    this.getPools();
    this.getPoolDetails(this.sourceInput.asset.chain, this.sourceInput.asset.symbol, 'source');
    this.getPoolDetails(this.targetInput.asset.chain, this.targetInput.asset.symbol, 'target');
    this.calculateSingleSwap();
  }

  getPools() {
    this.midgardService.getPools().subscribe(
      (res) => {

        const availablePools = res.filter( (pool) => pool.status === 'available' );

        this.selectableMarkets = availablePools
        .sort( (a, b) => a.asset.localeCompare(b.asset) )
        .map((pool) => ({
          asset: new Asset(pool.asset),
          assetPriceUSD: +pool.assetPriceUSD
        }))
        // filter out until we can add support
        .filter( (pool) =>
          pool.asset.chain === 'THOR'
          || pool.asset.chain === 'BTC'
        );

        // Keeping RUNE at top by default
        this.selectableMarkets.unshift({
          asset: new Asset('THOR.RUNE'),
          assetPriceUSD: this.thorchainPricesService.estimateRunePrice(availablePools)
        });

        this.sourceInput.price = this.selectableMarkets.find( (pool) => pool.asset.chain === 'BTC' && pool.asset.ticker === 'BTC').assetPriceUSD;

        this.targetInput.price = this.thorchainPricesService.estimateRunePrice(availablePools);
      },
      (err) => console.error('error fetching pools:', err)
    );
  }

  calculateSingleSwap() {

    const toRune = true;

    const poolDetail = (toRune)
      ? this.poolDetailMap[`${this.sourceInput.asset.chain}.${this.sourceInput.asset.symbol}`]
      : this.poolDetailMap[`${this.targetInput.asset.chain}.${this.targetInput.asset.symbol}`];

    console.log(poolDetail);
    if (poolDetail) {
      const pool: PoolData = {
        assetBalance: baseAmount(poolDetail.assetDepth),
        runeBalance: baseAmount(poolDetail.runeDepth),
      };

      /**
       * TO SHOW BASE PRICE
       */

      // const valueOfRuneInAsset = getValueOfRuneInAsset(assetToBase(assetAmount(1)), pool);
      // const valueOfAssetInRune = getValueOfAssetInRune(assetToBase(assetAmount(1)), pool);

      // const basePrice = (toRune)
      //   ? valueOfRuneInAsset
      //   : valueOfAssetInRune;
      // this.basePrice = basePrice.amount().div(10 ** 8).toNumber();

      /**
       * Slip percentage using original input
       */
      const slip = getSwapSlip(this._sourceAssetTokenValue, pool, toRune);
      this.slip = slip.toNumber();

      /**
       * Total output amount in target units minus 1 RUNE
       */
      // const totalAmount = getSwapOutput(baseAmount(this._sourceAssetTokenValue.amount()), pool, toRune);
      const totalAmount = getSwapOutput(baseAmount(this._sourceAssetTokenValue.amount()), pool, toRune);

      this.targetInput.amount = totalAmount.amount().toNumber();
    }

  }

  getPoolDetails(chain: string, symbol: string, type: 'source' | 'target') {

    this.midgardService.getPool(`${chain}.${symbol}`).subscribe(
      (res) => {
        if (res) {
          this.poolDetailMap[`${chain}.${symbol}`] = res;
        }
      },
      (err) => {
        console.error('error fetching pool details: ', err);
      }
    );

  }

  ngAfterViewInit() {

    document.addEventListener('readystatechange', event => {
      document.querySelectorAll('.ring-outer').forEach(
        (el) => {
          el.classList.remove('js-loading');
        }
      );
      setTimeout(
        () => {
          const container_wrapper = document.querySelector('.container-wrapper');
          container_wrapper.classList.remove('gray-border');
          let index = 0;
          setTimeout(
            () => {
              let container = setInterval(
                () => {
                  container_wrapper.classList.toggle('gray-border');
                  index++;

                  if (index > 15) {
                    clearInterval(container);
                    container_wrapper.classList.remove('gray-border');
                    this.startSwapAnimation()
                  }
                }
              , 50)
            }
          , 50)
        }
      , 2000)

    });
  }

  startSwapAnimation() {
    let grayLen = this.gray.length;

    for (let i = 0; i < grayLen; i++) {
      setTimeout(
        () => {
          this.gray[i] = false;
          console.log(new Date())
        }
      , (3 * i * 100));
    }

  }

}
