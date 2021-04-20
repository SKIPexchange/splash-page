import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** COMPONENTS */
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';

/** MODULES */
import { AppRoutingModule } from './app-routing.module';
import { AssetsListModule } from './_components/assets-list/assets-list.module';
import { AssetInputModule } from './_components/asset-input/asset-input.module';
import { DirectivesModule } from './_directives/directives.module';
import { ArrowModule } from './_components/arrow/arrow.module';
import { BreadcrumbModule } from './_components/breadcrumb/breadcrumb.module';

/** SERVICES */
import { LastBlockService } from './_services/last-block.service';

/** MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/** EXTERNAL */
import { LastBlockIndicatorComponent } from './_components/last-block-indicator/last-block-indicator.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LastBlockIndicatorComponent
  ],
  imports: [
    AssetInputModule,
    AssetsListModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    AppRoutingModule,
    DirectivesModule,
    ArrowModule,
    BreadcrumbModule,
  ],
  providers: [
    LastBlockService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
