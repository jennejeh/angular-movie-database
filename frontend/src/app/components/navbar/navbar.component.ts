import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute, RouteReuseStrategy} from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public title: string = "Navigation"
  model: string = ""
  arr:[string, string,  string, string][] = [];
  public isMenuCollapsed = true;
  constructor(private appService: AppService, private route: Router) {
    this.control = new FormControl('')
    this.route.routeReuseStrategy.shouldReuseRoute = () => false; }
  ngOnInit(): void {}
  control:FormControl

  update() {
    this.control.setValue('')
  }
  search = (text$: Observable<string>) => {
    return text$.pipe(
        debounceTime(200),
        switchMap(term =>
          this.appService.multi(term).pipe(
            map((response) => {
              this.arr = []
              for (let result of Object.values(response)){
                this.arr.push(result)
              }
              return this.arr
            })
          )
          )
    );
  }
  formatter = (x: { label: string }) => x.label;
}


