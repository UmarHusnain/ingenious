import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.loadStyles();
    this.loadScripts();
  }

  loadStyles(): void {
    const styles = [
      'assets/css/bootstrap.css',
      'assets/plugins/revolution/css/settings.css',
      'assets/plugins/revolution/css/layers.css',
      'assets/plugins/revolution/css/navigation.css',
      'assets/css/style.css',
      'assets/css/responsive.css',
    ];

    styles.forEach(styleUrl => {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleUrl;
      this.renderer.appendChild(this.document.head, link);
    });

    // Add favicons
    const favicon1 = this.renderer.createElement('link');
    favicon1.rel = 'shortcut icon';
    favicon1.href = 'images/favicon.png';
    this.renderer.appendChild(this.document.head, favicon1);

    const favicon2 = this.renderer.createElement('link');
    favicon2.rel = 'icon';
    favicon2.href = 'images/favicon.png';
    this.renderer.appendChild(this.document.head, favicon2);
  }

  loadScripts(): void {
    const scripts = [
      'assets/js/jquery.js',
      'assets/js/popper.min.js',
      'assets/js/bootstrap.min.js',
      'assets/plugins/revolution/js/jquery.themepunch.revolution.min.js',
      'assets/plugins/revolution/js/jquery.themepunch.tools.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.actions.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.carousel.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.migration.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.navigation.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.parallax.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js',
      'assets/plugins/revolution/js/extensions/revolution.extension.video.min.js',
      'assets/js/main-slider-script.js',
      'assets/js/jquery.fancybox.js',
      'assets/js/owl.js',
      'assets/js/wow.js',
      'assets/js/appear.js',
      'assets/js/script.js',
    ];

    scripts.forEach(scriptUrl => this.loadScript(scriptUrl));
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    this.renderer.appendChild(this.document.body, script);
  }
}
