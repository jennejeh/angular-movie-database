import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {
  faTwitter,
  faFacebookSquare,
  faImdb,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { PersonComponent } from 'src/app/components/person/person.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  faTwitter = faTwitter;
  faFacebook = faFacebookSquare;
  faImdb = faImdb;
  faInstagram = faInstagram;

  constructor(
    private appService: AppService,
    private router: ActivatedRoute,
    private route:Router,
    private modalService: NgbModal
  ) {this.route.routeReuseStrategy.shouldReuseRoute = () => false; }
  addedToWatchlist: boolean = false;
 removed: boolean = false;
public loaded: boolean = false;
  public id: any;
  public poster_path: any;
  public media: any;
  public x: any;
  public casts: any[] = [];

  public reviews: any;
  public utube: any;
  public title: any;
  public site: any;
  public name: any;
  public key: any;
  public twitter: any;
  public facebook: any;
  public youtubeLink: any;
  public recommended: string = 'recommended';
  public similar: string = 'similar';
  genres:string = ""
  spoken_languages:string = ""
  release_date: any
  runtime: any
  overview: any
  vote_average: any
  tagline: any

  castID: string = '';
  private _success = new Subject<string>();
  private _removed = new Subject<string>();
  public local: boolean = false;
  @ViewChild('added', {static: false}) added: NgbAlert | undefined;
  @ViewChild('removed', {static: false}) rem: NgbAlert | undefined;
  successMessage = '';
  removedMessage = '';
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.media = this.router.snapshot.paramMap.get('media_type');
    this.display();
    this.cast();
    this.review();
    this.youtube();
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.added) {
        this.added.close();
      }
    });
    this._removed.subscribe(message => this.removedMessage = message);
    this._removed.pipe(debounceTime(5000)).subscribe(() => {
      if (this.rem) {
        this.rem.close();
      }
    });
  }


  //-------------------- display
  dat(data: any) {
    for (let genre of data.genres){
      this.genres  += (genre.name + ', ')
    }
    this.genres = this.genres.replace(/(^,)|(, $)/g, "")
    for (let lang of data.spoken_languages){
      this.spoken_languages  += (lang.english_name + ', ')
    }

    this.spoken_languages = this.spoken_languages.replace(/(^,)|(, $)/g, "")
    this.overview = data.overview;
    if (data.vote_average==null) this.vote_average = "0"
    else  this.vote_average = data.vote_average;
    this.tagline = data.tagline;
    this.poster_path = data.poster_path;
    this.continuewatching();
  }
  display() {
    if (this.media == 'movie') {
      this.appService.moviedetails(this.id).subscribe((results) => {
        let data = JSON.parse(JSON.stringify(results));
        this.title = data.title;
        this.dat(data);
        this.release_date = data.release_date.slice(0,4);
          var num = data.runtime;
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          if (rhours != 1) this.runtime = rhours + "hrs " + rminutes + "mins";
          else this.runtime = rhours + "hr " + rminutes + "mins";
          this.loaded = true;
      });
    } else {
      this.appService.tvdetails(this.id).subscribe((results) => {
        let data = JSON.parse(JSON.stringify(results));
        this.title = data.name;
        this.dat(data);
        if (data.first_air_date != null) this.release_date = data.first_air_date.slice(0,4)
        else this.release_date = null
        var num = data.episode_run_time[0];
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          if (rhours == 0) this.runtime = rminutes + "mins";
          else if (rhours == 1) this.runtime = rhours + "hr " + rminutes + "mins";
          else this.runtime = rhours + "hrs " + rminutes + "mins";
      });
      this.loaded = true;

    }

  }

  // -------------------- cast
  cast() {
    if (this.media == 'movie') {
      this.appService.moviecast(this.id).subscribe((results) => {
        this.casthelper(results)
      });
    } else {
      this.appService.tvcast(this.id).subscribe((results) => {
        this.casthelper(results)
      });
    }
  }
  casthelper(results:any){
    let test = JSON.parse(JSON.stringify(results));
        for (let result of test) {
          if (result['profile_path'] != null) {
            this.casts.push(result);
          }
        }
  }
  // -------------------- cast modal
  open(id: string) {
    this.castID = id;
    const modalRef = this.modalService.open(PersonComponent, { size: 'xl' });
    modalRef.componentInstance.castID = this.castID;
    modalRef.result
      .then((result) => {
        if (result) {
        }
      })
      .catch((res) => {});
  }

//-------------------- reviews
  review() {
    if (this.media == 'movie') {
      this.appService.moviereviews(this.id).subscribe((results: any) => {
        this.reviewhelper(results)

      });
    } else {
      this.appService.tvreviews(this.id).subscribe((results: any) => {
        this.reviewhelper(results)
      });
    }
  }
  reviewhelper(results:any){
    let res = JSON.parse(JSON.stringify(results));
    if (results.length ==0) res = null
    else {
      for (let r of res){
        if (r.author_details.avatar_path == null) {
          r.author_details.avatar_path ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
        }
        else if (r.author_details.avatar_path.includes("http")){
          r.author_details.avatar_path = r.author_details.avatar_path.slice(1,)
        }
        else {
          r.author_details.avatar_path ="https://image.tmdb.org/t/p/original" + r.author_details.avatar_path
        }
      }

    }

    this.reviews = res
  }
//--------------------youtube
  youtube() {
    if (this.media == 'movie') {
      this.appService.movievideo(this.id).subscribe((results:any) => {
        this.youtubehelper(results)
      });
    } else {
      this.appService.tvvideo(this.id).subscribe((results: any) => {

      this.youtubehelper(results)
      });
    }
  }
  youtubehelper(results:any){
      if (results.length ==0) {
          this.key = "tzkWB85ULJY";
          this.youtubeLink = 'https://www.youtube.com/watch?v=' + this.key;
          this.twitter =
            'https://twitter.com/intent/tweet?text=Watch ' +
            encodeURIComponent(
              this.title + ' ' + this.youtubeLink + ' #USC #CSCI571 #FightOn'
            );
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.body.appendChild(tag);

        }
        else {
          for (let result of JSON.parse(JSON.stringify(results))) {
            if (result['type'] == 'Trailer') {
              this.site = result['site'];
              this.name = result['name'];
              this.key = result['key'];
              this.youtubeLink = 'https://www.youtube.com/watch?v=' + this.key;
              this.twitter =
                'https://twitter.com/intent/tweet?text=Watch ' +
                encodeURIComponent(
                  this.title + ' ' + this.youtubeLink + ' #USC #CSCI571 #FightOn'
                );
              const tag = document.createElement('script');
              tag.src = 'https://www.youtube.com/iframe_api';
              document.body.appendChild(tag);
              break
            }
            else if (result['type'] == 'Teaser') {
              this.site = result['site'];
              this.name = result['name'];
              this.key = result['key'];
              this.youtubeLink = 'https://www.youtube.com/watch?v=' + this.key;
              this.twitter =
                'https://twitter.com/intent/tweet?text=Watch ' +
                encodeURIComponent(
                  this.title + ' ' + this.youtubeLink + ' #USC #CSCI571 #FightOn'
                );
              const tag = document.createElement('script');
              tag.src = 'https://www.youtube.com/iframe_api';
              document.body.appendChild(tag);
              break
            }
          }
        }
  }

  // -------------------- add to watchlist

  add(id:string){
    if (this.addedToWatchlist == false) {
      this.addedToWatchlist = true
      let button = document.getElementById('button');
      button!.innerHTML = 'Remove from Watchlist';
      this._success.next(`Added to Watchlist.`);
      this._removed.next(``);
      let item = {
        id: this.id,
        poster_path: 'https://image.tmdb.org/t/p/original' + this.poster_path,
        media: this.media,
        title: this.title
      };
      localStorage.first = true;
      var arr = JSON.parse(localStorage.getItem('watchlist') || '[]');

      let entered = false;
      for (let a of arr) {
        if (a.id == item.id) {
          entered = true
          break
        }
      }
        if (!entered) {
        arr.push(item);
        arr.reverse()
        localStorage.setItem('watchlist', JSON.stringify(arr));
      }
    }
    else {
      this._removed.next(`Removed from Watchlist.`);
      let button = document.getElementById('button');
      button!.innerHTML = 'Add to Watchlist';
      this.addedToWatchlist = false
      this._success.next(``);

      localStorage.first = true;
      var arr = JSON.parse(localStorage.getItem('watchlist') || '[]'); // retrive from storage
      let item:any
      let entered = false;
      for (let a of arr) { // for all elements in storage
        if (a.id == this.id) { // if item is already in storage
          entered = true // mark as entered
          item = a // save this item
          break
        }
      }
        if (entered) { // if entered
        arr.pop(item); // remove the item
        localStorage.setItem('watchlist', JSON.stringify(arr)); //put back into local storage
      }
    }
  }
  continuewatching() {
    if (this.poster_path!=null)  {
      let item = {
        id: this.id,
        poster_path: 'https://image.tmdb.org/t/p/original' + this.poster_path,
        media: this.media,
        title: this.title
      };
      window.localStorage.first = true;
    var arr = JSON.parse(window.localStorage.getItem('continue') || '[]');
    let entered = false;
    for (let a of arr) {
      if (a.id == item.id) {
        entered = true
        break
      }
    }
    if (!entered) {
      arr.push(item);
      arr.reverse()
      window.localStorage.setItem('continue', JSON.stringify(arr));
    }
    }
  }
}

