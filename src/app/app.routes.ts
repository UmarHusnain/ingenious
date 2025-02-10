import { Routes } from '@angular/router';
import { HomeComponent } from './core/user-panel/components/home/home.component';
import { AboutComponent } from './core/user-panel/components/about/about.component';
import { ContactComponent } from './core/user-panel/components/contact/contact.component';
import { SmartLightingComponent } from './core/user-panel/components/smart-lighting/smart-lighting.component';
import { SmartGardenComponent } from './core/user-panel/components/smart-garden/smart-garden.component';
import { SurveillanceSecurityComponent } from './core/user-panel/components/surveillance-security/surveillance-security.component';
import { EnergyManagementComponent } from './core/user-panel/components/energy-management/energy-management.component';
import { ClimateControlComponent } from './core/user-panel/components/climate-control/climate-control.component';
import { WaterManagementComponent } from './core/user-panel/components/water-management/water-management.component';
import { PriceCalculatorComponent } from './core/user-panel/components/price-calculator/price-calculator.component';
import { ShopListComponent } from './core/user-panel/components/shop-list/shop-list.component';
import { CartComponent } from './core/user-panel/components/cart/cart.component';
import { CheckoutComponent } from './core/user-panel/components/checkout/checkout.component';
import { ProductDetailComponent } from './core/user-panel/components/product-detail/product-detail.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { WishListComponent } from './core/user-panel/components/wish-list/wish-list.component';
import { DashboardComponent } from './core/Admin-panel/Components/dashboard/dashboard.component';
import { UserComponent } from './core/Admin-panel/Components/user/user.component';
import { SigninComponent } from './core/auth/components/signin/signin.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';
import { CategoriesComponent } from './core/Admin-panel/Components/categories/categories.component';
import { AddCategoryComponent } from './core/Admin-panel/Components/categories/add-category/add-category.component';
import { ProductsComponent } from './core/Admin-panel/Components/products/products.component';
import { OrdersComponent } from './core/Admin-panel/Components/orders/orders.component';
export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // {
      //   path: '',
      //   component: HomeComponent,
      // },
       {
        path: '',
        component: DashboardComponent,
      },
  
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {path:'add-category',
        component:AddCategoryComponent
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      }
    ]
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },

  {
    path: '',
    component: UserLayoutComponent,
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
        path: 'wishlist',
        component: WishListComponent,
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
