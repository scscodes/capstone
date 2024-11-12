import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <div class="about-project">
      <h4>The Problem</h4>
      <p>
        Many industries face significant challenges in adopting innovative data solutions due to a variety of factors.
        The medical field, in particular, has expansive data sets but lacks tooling to harness and transform it into
        data-driven, actionable tooling.
      </p>

      <h4>The 3M Solution</h4>
      <p>
        Our approach leverages the latest in data science and analytics, combining numerous machine learning models
        and neural networks to create a baseline of knowledge, available on-demand, <strong>24/7/365</strong>.
      </p>
      <p>
        On top, a user-centric design provides a streamlined, accessible solution, with the flexibility to act as a
        standalone application or supplement existing software.
      </p>

      <h4>From Concept to Scale</h4>
      <p>
        This site is an interactive concept, providing a real-time demo from the perspective of two roles:
        a <strong>patient</strong> or <strong>staff (medical provider)</strong>.
      </p>
      <p>
        Each role demonstrates how applied analytics and tooling can support patient monitoring, treatment planning,
        and operational efficiency.
      </p>
    </div>
  `,
  styles: [`
    .about-project {
      padding: 20px;
      border-radius: 8px;
      max-width: 600px;
      margin: auto;
    }
    .about-project h3 {
      font-size: 1.5em;
      margin-bottom: 10px;
    }
  `]
})
export class AboutComponent {

}
