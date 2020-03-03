import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy, OnInit {
  public result: any;
  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.result.unsubscribe();
  }

  getData() {
    this.result = this.http.get(`/test`).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('error is ' + err);
    });
  }
}
