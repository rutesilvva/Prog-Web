import { Routes } from '@angular/router';
import { adminGuard } from './core/services/guards/admin.guards';
import { authGuard } from './core/services/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },

  { path: 'catalog',
    loadComponent: () => import('./features/catalog/catalog-page/catalog-page.component').then(m => m.CatalogPageComponent),
    title: 'Catálogo'
  },

  { path: 'product/:slug',
    loadComponent: () => import('./features/catalog/product-detail-page/product-detail-page.component').then(m => m.ProductDetailPageComponent),
    title: 'Produto'
  },

  { path: 'cart',
    loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent),
    title: 'Carrinho'
  },

  { path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent),
    title: 'Checkout'
  },

  { path: 'account',
    loadComponent: () => import('./features/account/profile-page/profile-page.component').then(m => m.ProfilePageComponent),
    title: 'Minha Conta'
  },

  { path: 'account/downloads',
    loadComponent: () => import('./features/account/downloads-page/downloads-page.component').then(m => m.DownloadsPageComponent),
    title: 'Meus Downloads'
  },

  { path: 'login',
    loadComponent: () => import('./features/account/login-page/login-page.component').then(m => m.LoginPageComponent),
    title: 'Entrar'
  },

  // ADMIN
  { path: 'admin/products',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-products-page/admin-products-page.component').then(m => m.AdminProductsPageComponent),
    title: 'Admin • Produtos'
  },
  { path: 'admin/orders',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-orders-page/admin-orders-page.component').then(m => m.AdminOrdersPageComponent),
    title: 'Admin • Pedidos'
  },

  // Páginas institucionais
  { path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre'
  },
  { path: 'contact',
    loadComponent: () => import('./features/contact/contact-page/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contato'
  },

  { path: 'pages/terms',
    loadComponent: () => import('./features/pages/terms/terms.component').then(m => m.TermsComponent),
    title: 'Termos de Uso'
  },
  { path: 'pages/returns',
    loadComponent: () => import('./features/pages/returns/returns.component').then(m => m.ReturnsComponent),
    title: 'Política de Trocas'
  },
  { path: 'pages/shipping',
    loadComponent: () => import('./features/pages/shipping/shipping.component').then(m => m.ShippingComponent),
    title: 'Política de Envio'
  },
  { path: 'pages/privacy',
    loadComponent: () => import('./features/pages/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'Política de Privacidade'
  },

   { path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout-page/checkout-page.component')
      .then(m => m.CheckoutPageComponent),
    title: 'Checkout'
  },

  { path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/profile-page/profile-page.component')
      .then(m => m.ProfilePageComponent),
    title: 'Minha Conta'
  },

  // Painel admin
  { path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-orders-page/admin-orders-page.component')
      .then(m => m.AdminOrdersPageComponent),
    title: 'Admin'
  },


  { path: '**', redirectTo: 'home' }
];
