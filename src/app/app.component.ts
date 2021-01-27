import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly title = 'Beamer';

  constructor(
    private authService: MsalService
  ) { }

  public currentUser() {
    this.authService.instance.getAllAccounts().map(x => console.log(x));
  }
}
