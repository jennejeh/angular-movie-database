import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor() { }

  public watchlist: any
  arr: any[] = []
  ngOnInit(): void {
    this.watchlist = localStorage.getItem('watchlist');
    if (this.watchlist!=null) {
      if (this.watchlist.length==0){
        this.watchlist=null

      }
    let result = JSON.parse(this.watchlist)
      for (let result1 of result){
        // 0 = pic, 1 = id, 2 = media, 3 = title
        this.arr.push([result1['poster_path'], result1['id'],result1['media'], result1['title']]);
      }
    }
  }

}
