import { environment } from './../environments/environment';
import { reducers, metaReducers } from './reducers/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PollingComponent } from './polling/polling.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { ThemeModule } from './theme/theme.module';
import { lightTheme } from './theme/light.theme';

@NgModule({
  declarations: [
    AppComponent,
    PollingComponent,
    DialogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    ThemeModule.forRoot({
      themes: [lightTheme],
      active: 'light'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
