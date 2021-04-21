import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = "https://csci-571-hw8-backend-310106.wm.r.appspot.com/";
  // public headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  constructor(private httpClient: HttpClient) { }

  public multi(query: string){
    let params = new HttpParams();
    params = params.append('query', query);
    return this.httpClient.get(this.url+"multi", {params: params});
  }

//-------------------------------movie carousel
  public currentmovies(){
    return this.httpClient.get(this.url+"currentmovies");
  }
  public popularmovies(){
    return this.httpClient.get(this.url+"popularmovies");
  }
  public topmovies(){
    return this.httpClient.get(this.url+"topmovies");
  }
  public trendingmovies(){
    return this.httpClient.get(this.url+"trendingmovies");
  }

//-------------------------------tv carousels
  public popularshows(){
    return this.httpClient.get(this.url+"popularshows");
  }
  public topshows(){
    return this.httpClient.get(this.url+"topshows");
  }
  public trendingshows(){
    return this.httpClient.get(this.url+"trendingshows");
  }

  //-------------------------------movie details
  public moviedetails(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"moviedetails", {params: params});
  }
  public moviecast(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"moviecast", {params: params});
  }
  public moviereviews(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"moviereviews", {params: params});
  }
  public movievideo(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"movievideo", {params: params});
  }

   //-------------------------------tv details
   public tvdetails(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"tvdetails", {params: params});
  }
  public tvcast(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"tvcast", {params: params});
  }
  public tvreviews(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"tvreviews", {params: params});
  }
  public tvvideo(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"tvvideo", {params: params});
  }

  //
  public similarmovies(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"similarmovies", {params: params});
  }
  public recommendedmovies(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"recommendedmovies", {params: params});
  }
  public similarshows(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"similarshows", {params: params});
  }
  public recommendedshows(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"recommendedshows", {params: params});
  }

  // -- cast details
  public castdetails(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"castdetails", {params: params});
  }
  public castexternal(id:string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(this.url+"castexternal", {params: params});
  }



}
