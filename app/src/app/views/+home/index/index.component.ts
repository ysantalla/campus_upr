import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, state, animate } from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('EnterLeft', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-350%)' }),
        animate('0.6s 600ms ease-in')
      ])
    ]),
    trigger('EnterLeftSlogan', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-600%)' }),
        animate('0.7s 700ms ease-in')
      ])
    ]),
    trigger('EnterRight', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(650%)' }),
        animate('1.5s 400ms ease-in')
      ])
    ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('EnterLeftButton', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-750%)' }),
        animate('0.9s 900ms ease-in')
      ])
    ])
  ]
})
export class IndexComponent implements OnInit {

  color: string;
  otherColor: string;

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000
  };

  constructor() { }

  ngOnInit() {
    this.color = 'white';
    this.otherColor = 'green';
  }

}
