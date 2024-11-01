import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './static/layout/header.component';
import {FooterComponent} from './static/layout/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `

<!--    <app-header></app-header>-->
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
<!--    <app-footer></app-footer>-->
  `,
  styles: ``
})
export class AppComponent  {
}
