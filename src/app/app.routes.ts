import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AboutComponent } from './core/components/about/about.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { SmartLightingComponent } from './core/components/smart-lighting/smart-lighting.component';
import { SmartGardenComponent } from './core/components/smart-garden/smart-garden.component';
import { SurveillanceSecurityComponent } from './core/components/surveillance-security/surveillance-security.component';
import { EnergyManagementComponent } from './core/components/energy-management/energy-management.component';
import { ClimateControlComponent } from './core/components/climate-control/climate-control.component';
import { WaterManagementComponent } from './core/components/water-management/water-management.component';
import { PriceCalculatorComponent } from './core/components/price-calculator/price-calculator.component';
import { ShopListComponent } from './core/components/shop-list/shop-list.component';
import { CartComponent } from './core/components/cart/cart.component';
import { CheckoutComponent } from './core/components/checkout/checkout.component';
import { ProductDetailComponent } from './core/components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'smart-lighting',
        component: SmartLightingComponent,
      },
      {
        path: 'smart-garden',
        component: SmartGardenComponent,
      },
      {
        path: 'surveillance-security',
        component: SurveillanceSecurityComponent,
      },
      {
        path: 'energy-management',
        component: EnergyManagementComponent,
      },
      {
        path: 'climate-control',
        component: ClimateControlComponent,
      },
      {
        path: 'water-management',
        component: WaterManagementComponent,
      },
      {
        path: 'price-calculator',
        component: PriceCalculatorComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'shop',
        component: ShopListComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
      },
    ],
  },
];
