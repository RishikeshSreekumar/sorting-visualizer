import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss'],
})
export class VerticalBarComponent implements OnInit {
  @Input() height: number;
  @Input() highlight: string;
  @Input() algo: string;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      document.getElementById(
        `${this.algo}-bar-${this.height}`
      ).style.height = `${this.height * 15}px`;
      document.getElementById(`bar-${this.height}`).style.backgroundColor =
        this.highlight;
    }, 100);
  }
}
