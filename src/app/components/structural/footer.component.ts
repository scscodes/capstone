import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <h5>footer</h5>
    </footer>
  `,
  styles: `
    footer {
      background-color: darkslategray;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
    }
  `
})
export class FooterComponent {
}
