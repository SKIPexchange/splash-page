import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, timer, of, Subscription } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { MidgardService } from './_services/midgard.service';
import { LastBlock } from 'src/app/_classes/last-block';
import { LastBlockService } from './_services/last-block.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isTestnet: boolean;
  subs: Subscription[];
  killPolling: Subject<void> = new Subject();


  constructor(private midgardService: MidgardService, private lastBlockService: LastBlockService) {
    this.isTestnet = (environment.network === 'testnet');
  }

  ngOnInit(): void {
    this.pollLastBlock();

    if (this.isTestnet) {
      document.documentElement.style.setProperty('--primary-default', '#F3BA2F');
      document.documentElement.style.setProperty('--primary-graident-bottom-left', '#F3BA2F');
      document.documentElement.style.setProperty('--primary-graident-top-right', '#F3BA2F');
    }
  }

  pollLastBlock(): void {
    const refreshInterval$ = timer(0, 15000)
    .pipe(
      // This kills the request if the user closes the component
      takeUntil(this.killPolling),
      // switchMap cancels the last request, if no response have been received since last tick
      switchMap(() => this.midgardService.getLastBlock()),
      // catchError handles http throws
      catchError(error => of(error))
    ).subscribe( async (res: LastBlock[]) => {
      if (res.length > 0) {
        this.lastBlockService.setBlock(res[0].thorchain);
      }
    });
    this.subs = [refreshInterval$];
  }

  ngOnDestroy(): void {
    this.killPolling.next();
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
