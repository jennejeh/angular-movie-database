import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { faTwitter, faFacebookSquare, faImdb, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() public castID: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  faTwitter = faTwitter;
  faFacebook = faFacebookSquare;
  faImdb = faImdb;
  faInstagram = faInstagram;
  loaded:boolean = false
  image:boolean = false
  castName:any
  birthday:any
  gender:any
  homepage:any
  also_known_as:string = ""
  department:any
  biography:any
  place_of_birth: any
  prof_path: any

  imdb_id:any
  facebook_id:any
  instagram_id:any
  twitter_id:any
  constructor(private appService: AppService, public activeModal: NgbActiveModal) { }
  passBack() {
    this.activeModal.close(this.castID);
    }
  ngOnInit(): void {
    this.appService.castdetails(this.castID).subscribe(results => {
      let test = JSON.parse(JSON.stringify(results))
      this.birthday = test['birthday']
      if (test['gender'] == "1") this.gender = "Female"
      if (test['gender'] == "2") this.gender = "Male"
      if (test['gender'] == "0") this.gender = "undefined"
      this.prof_path = "https://image.tmdb.org/t/p/w500/" + test['profile_path']
      this.image = true
      this.castName = test['name']
      this.homepage = test['homepage']

      this.place_of_birth = test['place_of_birth']
      for (let x of test['also_known_as']){
        this.also_known_as += (x + ', ')
      }
      this.also_known_as = this.also_known_as.replace(/(^,)|(, $)/g, "")
      this.department = test['known_for_department']
      this.biography = test['biography']
   });

   this.appService.castexternal(this.castID).subscribe(results => {
    let test = JSON.parse(JSON.stringify(results))
    this.imdb_id= test['imdb_id']
    this.facebook_id = test['facebook_id']
    this.instagram_id = test['instagram_id']
    this.twitter_id = test['twitter_id']
 });
 this.loaded = true;
  }

}
