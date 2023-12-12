import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  selector: 'angular-view-transition-example-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-view-transition-example';
  showBackArrow = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showBackArrow = this.router.url.includes('details');
    });
  }

  back() {
    this.router.navigate([`/color/All/height/0.1`]);
  }
}
