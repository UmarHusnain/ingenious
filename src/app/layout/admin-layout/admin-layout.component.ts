import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../shared/components/admin/header/header.component';
import { FooterComponent } from '../../shared/components/admin/footer/footer.component';
import { SidebarComponent } from '../../shared/components/admin/sidebar/sidebar.component';
import {
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,

} from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

declare let $: any;

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnDestroy {
  private routerSubscription!: Subscription;
  scriptsLoaded = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStyles();
    this.loadAdminScripts()
      .then(() => {
        console.log('All Admin scripts loaded successfully.');
        this.initializeDataTables();
        this.scriptsLoaded = true;
      })
      .catch((err) => {
        console.error('Error loading Admin scripts:', err);
      });
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.initializeDataTables();
  //   }, 500);
  // }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadStyles(): void {
    const styles = [
      // 'adminAssets/dist/css/bootstrap.css',
      // 'adminAssets/plugins/fontawesome-free/css/all.min.css',
      // 'adminAssets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
      // 'adminAssets/plugins/icheck-bootstrap/icheck-bootstrap.min.css',
      // 'adminAssets/plugins/jqvmap/jqvmap.min.css',
      // 'adminAssets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
      // 'adminAssets/plugins/daterangepicker/daterangepicker.css',
      // 'adminAssets/plugins/summernote/summernote-bs4.min.css',
      // 'adminAssets/dist/css/adminlte.min.css',
      // 'adminAssets/dist/css/dataTables.bootstrap4.min.css',
      // 'adminAssets/dist/css/responsive.bootstrap4.min.css',
      // 'adminAssets/dist/css/buttons.bootstrap4.min.css',
      "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
      "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",

      "./assets/adminAssets/plugins/fontawesome-free/css/all.min.css",
      "./assets/adminAssets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
      "./assets/adminAssets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "./assets/adminAssets/plugins/jqvmap/jqvmap.min.css",

      "./assets/adminAssets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
      "./assets/adminAssets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
      "./assets/adminAssets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css",

      "./assets/adminAssets/dist/css/adminlte.min.css",
      "./assets/adminAssets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
      "./assets/adminAssets/plugins/daterangepicker/daterangepicker.css",
      "./assets/adminAssets/plugins/summernote/summernote-bs4.min.css"
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


  private loadAdminScripts(): Promise<void> {
    // We need to load jQuery, then bootstrap.bundle, then DataTables, etc.
    // We’ll chain promises for correct loading order.

    return this.loadScript('./assets/adminAssets/plugins/jquery/jquery.min.js')
      .then(() => this.loadScript('./assets/adminAssets/plugins/bootstrap/js/bootstrap.bundle.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables/jquery.dataTables.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-responsive/js/dataTables.responsive.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-buttons/js/dataTables.buttons.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/jszip/jszip.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/pdfmake/pdfmake.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/pdfmake/vfs_fonts.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-buttons/js/buttons.html5.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-buttons/js/buttons.print.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/plugins/datatables-buttons/js/buttons.colVis.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/dist/js/adminlte.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/dist/js/demo.js'))
      .then(() => Promise.resolve()); // Return a resolved promise at the end
  }

  private loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (err:any) => reject(err);
      this.renderer.appendChild(this.document.body, script);
    });
  }
  initializeDataTables() {
    if (typeof $ === 'undefined') {
      console.warn('jQuery not available yet');
      return;
    }

    // Example of enabling DataTables on #example1
    $('#example1').DataTable({
      responsive: true,
      lengthChange: false,
      autoWidth: false,
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis']
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

    // If you have another table: #example2, do it similarly
  }


  // loadScripts(): void {

  //   this.loadRemainingScripts();
  // }

  // loadRemainingScripts(): void {
  //   const scripts = [
  //     "assets/adminAssets/plugins/jquery/jquery.min.js",
  //     "assets/adminAssets/plugins/bootstrap/js/bootstrap.bundle.min.js",
  //     "assets/adminAssets/plugins/datatables/jquery.dataTables.min.js",
  //     "assets/adminAssets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js",
  //     "assets/adminAssets/plugins/datatables-responsive/js/dataTables.responsive.min.js",
  //     "assets/adminAssets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
  //     "assets/adminAssets/plugins/datatables-buttons/js/dataTables.buttons.min.js",
  //     "assets/adminAssets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js",
  //     "assets/adminAssets/plugins/jszip/jszip.min.js",
  //     "assets/adminAssets/plugins/pdfmake/pdfmake.min.js",
  //     "assets/adminAssets/plugins/pdfmake/vfs_fonts.js",
  //     "assets/adminAssets/plugins/datatables-buttons/js/buttons.html5.min.js",
  //     "assets/adminAssets/plugins/datatables-buttons/js/buttons.print.min.js",
  //     "assets/adminAssets/plugins/datatables-buttons/js/buttons.colVis.min.js",
  //     "assets/adminAssets/dist/js/adminlte.min.js",
  //     "assets/adminAssets/dist/js/demo.js"
  //   ];

  //   scripts.forEach((scriptUrl) => this.loadScript(scriptUrl));
  // }

  // loadScript(src: string, callback?: () => void): void {
  //   const script = this.renderer.createElement('script');
  //   script.src = src;
  //   script.type = 'text/javascript';
  //   script.onload = callback || (() => { });
  //   this.renderer.appendChild(this.document.body, script);
  // }


  // reloadScripts(): void {
  //   // Remove existing scripts
  //   const existingScripts = Array.from(
  //     this.document.body.querySelectorAll('script[src]')
  //   );
  //   existingScripts.forEach((script) =>
  //     this.renderer.removeChild(this.document.body, script)
  //   );

  //   // Re-load all scripts
  //   this.loadScripts();
  // }

}
