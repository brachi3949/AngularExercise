import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  name !: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url
      .subscribe(params => {

        var x = params.length;
        this.name = params[x - 1].path;
      }
      );
  }
}
