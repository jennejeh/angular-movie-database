import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'watch',
    children: [
      {
        path: ':media_type',
        children: [
          { path: ':id', component: DetailsComponent },
        ],
      },
    ],
  },
  { path: 'mylist', component: WatchlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
