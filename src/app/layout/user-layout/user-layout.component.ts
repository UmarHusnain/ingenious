import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import {
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthService } from '../../core/auth/Services/auth.service';
import { LocalStorageService } from '../../core/auth/Services/localStorage.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [ FooterComponent,
      HeaderComponent,
      RouterModule,
      RouterOutlet,
      CommonModule,],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  providers: [AuthService, LocalStorageService]
})
export class UserLayoutComponent implements OnDestroy {
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
      'assets/userAssets/css/bootstrap.css',
      // 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      'assets/userAssets/plugins/revolution/css/settings.css',
      'assets/userAssets/plugins/revolution/css/layers.css',
      'assets/userAssets/plugins/revolution/css/navigation.css',
      'assets/userAssets/css/style.css',
      'assets/userAssets/css/responsive.css',
      'assets/userAssets/css/odometer.css',
      'assets/userAssets/css/bootstrap.css',
      // 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
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
    favicon1.href = 'assets/userAssets/images/favicon.png';
    this.renderer.appendChild(this.document.head, favicon1);

    const favicon2 = this.renderer.createElement('link');
    favicon2.rel = 'icon';
    favicon2.href = 'assets/userAssets/images/favicon.png';
    this.renderer.appendChild(this.document.head, favicon2);
  }

  loadScripts(): void {
    this.loadScript('assets/userAssets/js/jquery.js', () => {
      this.loadScript('assets/userAssets/js/popper.min.js', () => {
        this.loadScript('assets/userAssets/js/bootstrap.min.js', () => {
          this.loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js', () => {
          this.loadScript('assets/userAssets/plugins/revolution/js/jquery.themepunch.revolution.min.js', () => {
            this.loadScript('assets/userAssets/plugins/revolution/js/jquery.themepunch.tools.min.js', () => {
              this.loadRemainingScripts(); 
            });
          });
          });
        });
      });
    });
  }

  loadRemainingScripts(): void {
    const scripts = [
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.actions.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.carousel.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.kenburn.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.migration.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.navigation.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.parallax.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.slideanims.min.js',
      'assets/userAssets/plugins/revolution/js/extensions/revolution.extension.video.min.js',
      'assets/userAssets/js/main-slider-script.js',
      'assets/userAssets/js/knob.js',
      'assets/userAssets/js/jquery.fancybox.js',
      'assets/userAssets/js/owl.js',
      'assets/userAssets/js/wow.js',
      'assets/userAssets/js/appear.js',
      'assets/userAssets/js/script.js',
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
