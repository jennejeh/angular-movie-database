import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private appService: AppService) { }
  public current:string = 'currentmovies'
  public continuewatching:string = 'continuewatching'
  public popular:string = 'popularmovies'
  public top:string = 'topmovies'
  public trending:string = 'trendingmovies'

  public popularshows:string = 'popularshows'
  public topshows:string = 'topshows'
  public trendingshows:string = 'trendingshows'

  ngOnInit() { }
}


