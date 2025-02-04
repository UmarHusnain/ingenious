import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../Services/localStorage.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers:[AuthService, LocalStorageService]
})
export class SigninComponent {
  isLoading: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;
  credentials = { email: '', password: '' };
 constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
  ) { }
  ngOnInit(){
  this.loadStyles()
  this.loadAdminScripts()
  }


  loadStyles(): void {
    const styles = [
      "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
      "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",
      "./assets/adminAssets/plugins/fontawesome-free/css/all.min.css",
      "./assets/adminAssets/plugins/fontawesome-free/css/fontawesome.min.css",
      "./assets/adminAssets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "./assets/adminAssets/dist/css/adminlte.min.css",
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
  
    return this.loadScript('./assets/adminAssets/plugins/jquery/jquery.min.js')
      .then(() => this.loadScript('./assets/adminAssets/plugins/bootstrap/js/bootstrap.bundle.min.js'))
      .then(() => this.loadScript('./assets/adminAssets/dist/js/adminlte.min.js'))
      .then(() => Promise.resolve());
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
  onLogin(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.showAlert = true;
      this.alertType = 'error';
      this.alertMessage = 'Please enter both email and password.';
      return;
    }
    this.isLoading = true;
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.statusCode===200){
          this.showAlertMessage("'Login successful",'success')
          const loginResponse = response.data;
          this.localStorageService.saveTokenWithLoginedData(loginResponse);
          const redirectUrl = localStorage.getItem('redirectUrl');

          if (redirectUrl) {
            // Redirect to the saved URL and clear it
            localStorage.removeItem('redirectUrl');
            this.router.navigate([redirectUrl]);
          } else {
            // Normal flow
            let userRole = this.authService.getUserRole();
            const userId =  this.authService.getAspNetUserId();
            if (userRole==='Admin'){
              this.router.navigate(['/admin']);
           //   console.log('Logined Doctor Data', resp);
             // this.localStorageService.setItem('doctor', resp.data);
            }
            else{
              this.router.navigate(['/about']);
            }
          }
        }
      

        console.log('Login successful', response);
      },
      (error) => {
        this.isLoading = false;
        this.showAlertMessage("'Login failed. Please check your credentials.",'error')
      }
    );
  }
  showAlertMessage(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
  
    setTimeout(() => {
      this.closePopupMsg();
    }, 5000);
  }
  
  closePopupMsg() {
    this.showAlert = false;
  }
}
