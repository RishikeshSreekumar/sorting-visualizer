import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
})
export class VisualizerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  route(path: string) {
    this.router.navigate([path]);
  }
}
