import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource
} from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {}
  @Input() data: any;
  @Input() media_type: any;
  @Input() id: any;

  images: any[] = [];
  titles: any[] = [];
  public heading:any = null
  public loaded:boolean =false
  public media: string = ""
  public current:boolean =false
  detail: boolean = false
  arr0: [string, string, string, string][] = [];
  arr1: [string, string, string, string][] = [];
  arr2: any[] = [];

  ngOnInit() {
    if (this.data == 'currentmovies') this.currentmovies();
    if (this.data == 'continuewatching')  this.continuewatching();
    if (this.data == 'popularmovies') this.popularmovies();
    if (this.data == 'topmovies') this.topmovies();
    if (this.data == 'trendingmovies') this.trendingmovies();

    if (this.data == 'popularshows') this.popularshows();
    if (this.data == 'topshows') this.topshows();
    if (this.data == 'trendingshows') this.trendingshows();

    if (this.data == 'recommended') {
      if (this.media_type == 'movie') this.recommendedmovies();
      if (this.media_type == 'tv') this.recommendedshows();
    }
    if (this.data == 'similar') {
      if (this.media_type == 'movie') this.similarmovies()
      if (this.media_type == 'tv') this.similarshows()
    }
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  // ---------------------------- CAROUSELS
  nestedloop(){
    var j = -1;
    for (var i = 0; i < this.arr1.length; i++) {
      if (i % 6 == 0) {
        j++;
        this.arr2[j] = [];
      }
      this.arr2[j].push(this.arr1[i]);
    }
  }
  currentmovies() {
    this.appService.currentmovies().subscribe((data) => {
      for (let result of Object.values(data)) {
        // 0 = pic, 1 = id, 2 = media, 3 = title
        if (result['backdrop_path']) this.arr0.push(['https://image.tmdb.org/t/p/original' + result['backdrop_path'], result['id'], "movie", result['title']]);
      }
      this.current = true
    });
  }
  continuewatching(){
    let x = window.localStorage.getItem('continue');
    if (x!=null) {
      this.heading = "Continue Watching"
      let result = JSON.parse(x)
      for (let result1 of result){
        // 0 = pic, 1 = id, 2 = media, 3 = title
        if (result1['poster_path']) this.arr1.push([result1['poster_path'], result1['id'],result1['media'], result1['title']]);
      }
      this.nestedloop()
    }
  }

  popularmovies() {
    this.appService.popularmovies().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "movie", result['title']]);
      }
        this.nestedloop()
        this.heading = "Popular Movies"
    });
  }
  topmovies() {

    this.appService.topmovies().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "movie", result['title']]);
      }
        this.nestedloop()
        this.heading = "Top Rated Movies"
    });
  }
  trendingmovies() {
    this.appService.trendingmovies().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "movie", result['title']]);
      }
        this.nestedloop()
        this.heading = "Trending Movies"
    });
  }
  popularshows() {
    this.appService.popularshows().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "tv", result['name']]);
      }
        this.nestedloop()
        this.heading = "Popular TV Shows"
    });
  }
  topshows() {
    this.appService.topshows().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "tv", result['name']]);
      }
        this.nestedloop()
        this.heading = "Top Rated TV Shows"
    });
  }
  trendingshows() {
    this.appService.trendingshows().subscribe((data) => {
      for (let result of Object.values(data)) {
        if (result['poster_path']) this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "tv", result['name']]);
      }
        this.nestedloop()
        this.heading = "Trending TV Shows"
    });
  }
  similarmovies() {
    this.appService.similarmovies(this.id).subscribe((data) => {
      if (JSON.stringify(data).length > 2) {
        for (let result of Object.values(data)) {
          this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "movie", result['title']]);
        }
          this.nestedloop()
          this.heading = "Similar Movies"
      }
    });
  }

 recommendedmovies() {
    this.appService.recommendedmovies(this.id).subscribe((data) => {
      if (JSON.stringify(data).length > 2) {
      for (let result of Object.values(data)) {
        this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "movie", result['title']]);
      }
        this.nestedloop()
        this.heading = "Recommended Movies"
      }

    });
  }
  similarshows() {
    this.appService.similarshows(this.id).subscribe((data) => {
      if (JSON.stringify(data).length > 2) {
        for (let result of Object.values(data)) {
          this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "tv", result['name']]);
        }
          this.nestedloop()
          this.heading = "Similar TV Shows"
      }
    });
  }

 recommendedshows() {
    this.appService.recommendedshows(this.id).subscribe((data) => {
      if (JSON.stringify(data).length > 2) {
        for (let result of Object.values(data)) {
          this.arr1.push(['https://image.tmdb.org/t/p/w500' + result['poster_path'], result['id'], "tv", result['name']]);
        }
          this.nestedloop()
          this.heading = "Recommended TV Shows"
      }
    });
  }

  details(id:string, media:string, event:any){
    event.stopPropagation()
    this.id = id
    this.media = media
    this.detail = true
    setTimeout(() => {
      this.router.navigate(['watch/' + media +'/'+ id]);
  }, 3000);
  }
}
