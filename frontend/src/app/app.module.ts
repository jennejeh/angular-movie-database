import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DetailsComponent } from './components/details/details.component';
import { PersonComponent } from './components/person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WatchlistComponent,
    NavbarComponent,
    CarouselComponent,
    DetailsComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ PersonComponent ]
})
export class AppModule { }
