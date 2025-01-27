import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnDestroy {
  private routerSubscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStyles();
    this.loadScripts();
    // Listen for route changes to reload scripts
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reloadScripts(); // Reinitialize scripts on route change
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadStyles(): void {
    const styles = [
      'assets/css/bootstrap.css',
      'assets/plugins/revolution/css/settings.css',
      'assets/plugins/revolution/css/layers.css',
      'assets/plugins/revolution/css/navigation.css',
      'assets/css/style.css',
      'assets/css/responsive.css',
      'assets/css/odometer.css',
    ];

    styles.forEach((styleUrl) => {
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

  // loadScripts(): void {
  //   const scripts = [
  //     'assets/js/jquery.js',
  //     'assets/js/popper.min.js',
  //     'assets/js/bootstrap.min.js',
  //     'assets/plugins/revolution/js/jquery.themepunch.revolution.min.js',
  //     'assets/plugins/revolution/js/jquery.themepunch.tools.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.actions.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.carousel.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.migration.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.navigation.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.parallax.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js',
  //     'assets/plugins/revolution/js/extensions/revolution.extension.video.min.js',
  //     'assets/js/main-slider-script.js',
  //     'assets/js/knob.js',
  //     'assets/js/jquery.fancybox.js',
  //     'assets/js/owl.js',
  //     'assets/js/wow.js',
  //     'assets/js/appear.js',
  //     'assets/js/script.js',
  //   ];

  //   scripts.forEach((scriptUrl) => this.loadScript(scriptUrl));
  // }

  // loadScript(src: string): void {
  //   const script = this.renderer.createElement('script');
  //   script.src = src;
  //   script.type = 'text/javascript';
  //   this.renderer.appendChild(this.document.body, script);
  // }
  loadScripts(): void {
    this.loadScript('assets/js/jquery.js', () => {
      this.loadScript('assets/js/popper.min.js', () => {
        this.loadScript('assets/js/bootstrap.min.js', () => {
          this.loadScript('assets/plugins/revolution/js/jquery.themepunch.revolution.min.js', () => {
            this.loadScript('assets/plugins/revolution/js/jquery.themepunch.tools.min.js', () => {
              this.loadRemainingScripts(); // Load the rest after these are loaded
            });
          });
        });
      });
    });
  }

  loadRemainingScripts(): void {
    const scripts = [
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
      'assets/js/knob.js',
      'assets/js/jquery.fancybox.js',
      'assets/js/owl.js',
      'assets/js/wow.js',
      'assets/js/appear.js',
      'assets/js/script.js',
    ];

    scripts.forEach((scriptUrl) => this.loadScript(scriptUrl));
  }

  loadScript(src: string, callback?: () => void): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = callback || (() => {});
    this.renderer.appendChild(this.document.body, script);
  }


  reloadScripts(): void {
    // Remove existing scripts
    const existingScripts = Array.from(
      this.document.body.querySelectorAll('script[src]')
    );
    existingScripts.forEach((script) =>
      this.renderer.removeChild(this.document.body, script)
    );

    // Re-load all scripts
    this.loadScripts();
  }
}
