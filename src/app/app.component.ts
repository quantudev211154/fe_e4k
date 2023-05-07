import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth-service/auth.service';
import { ScrollService } from './core/services/scroll-service/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fe_e4k';

  constructor(
    private authService: AuthService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.authService.checkSSO();
  }

  onActivate(event: Event) {
    this.scrollService.scrollToTop();
  }
}
