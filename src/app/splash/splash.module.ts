import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash.component';
import { RouterModule } from '@angular/router';
import { AssetInputModule } from '../_components/asset-input/asset-input.module';
import { ArrowModule } from '../_components/arrow/arrow.module';
import { BreadcrumbModule } from '../_components/breadcrumb/breadcrumb.module';
import { RightOptionModule } from '../_components/right-option/right-option.module';


@NgModule({
  declarations: [SplashComponent],
  imports: [
    CommonModule,
    AssetInputModule,
    ArrowModule,
    BreadcrumbModule,
    RightOptionModule,
    RouterModule.forChild([
      {
        path: '',
        component: SplashComponent
      }
    ])
  ]
})
export class SplashModule { }
