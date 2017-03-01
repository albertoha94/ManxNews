import { EXTRA_ROUTES } from './components/app-body/tab-extra/extra.routing';
import { TabExtraComponent } from './components/app-body/tab-extra/tab-extra.component';
import { TabAppsComponent } from './components/app-body/tab-apps/tab-apps.component';
import { TabRecentComponent } from './components/app-body/tab-recent/tab-recent.component';
import { Routes, RouterModule } from '@angular/router'

 const APP_ROUTES: Routes = [
     //-- Que por defecto te mande a la ventana de reciente siempre.
    { path: '', redirectTo: '/recent', pathMatch: 'full' },
    { path: 'recent', component: TabRecentComponent },
    { path: 'apps', component: TabAppsComponent },
    { path: 'extra', component: TabExtraComponent, children: EXTRA_ROUTES },
];

export const TabRoutes = RouterModule.forRoot(APP_ROUTES);