import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from './components/structural/footer.component';
import {HeaderComponent} from './components/structural/header.component';
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
