import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_classes/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isTestnet: boolean;
  //uses for hiding in confirmation view

  constructor() {
    this.isTestnet = environment.network === 'testnet' ? true : false;

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {}

  ngOnDestroy() {}

}
