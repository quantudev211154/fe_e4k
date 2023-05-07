import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-rounds',
  templateUrl: './all-rounds.component.html',
  styleUrls: ['./all-rounds.component.scss'],
})
export class AllRoundsComponent {
  constructor(private router: Router) {}

  goToAddRoundPage() {
    const targetRoute = this.router.url + '/add-round';

    this.router.navigateByUrl(targetRoute);
  }
}
