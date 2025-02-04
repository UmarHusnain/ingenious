import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { IRegister } from '../../Interfaces/IRegister';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../Services/localStorage.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers:[AuthService, 
    LocalStorageService]
})
export class SignupComponent {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;
constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private fb: FormBuilder,
    private authService:AuthService
  ) { }
  ngOnInit(){
  this.loadStyles()
  this.loadAdminScripts()
  this.registerForm = this.fb.group({
    roleId: [2],
    username: ['',Validators.required],
    contactNumber: ['', Validators.required],
    fullName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    isBlocked: [false],
    isDeleted: [false],
    address: this.fb.group({
      aspNetUserId: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      isDefault: [true]
    })
  });
  }
  onSubmit(): void {
    console.log(this.registerForm.value.address.street)
    if (this.registerForm.valid) {
      this.isLoading = true;
      const registrationData: IRegister = {
        ...this.registerForm.value,
        address: {
          aspNetUserId: '', 
          street: this.registerForm.value.address.street,
          city: this.registerForm.value.address.city,
          state: this.registerForm.value.address.state,
          postalCode: this.registerForm.value.address.postalCode,
          country: this.registerForm.value.address.country,
          isDefault: this.registerForm.value.address.isDefault,
        },
      };

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showAlertMessage('Registration successful!', 'success');
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error during registration:', error);
          this.showAlertMessage('Registration failed. Please try again.', 'error');
        },
      });
    } else {
      this.showAlertMessage('Please fill all required fields.', 'error');
    }
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
