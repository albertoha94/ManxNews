import { PlatformsComponent } from './platforms/platforms.component';
import { LanguagesComponent } from './languages/languages.component';
import { Routes, RouterModule } from '@angular/router'

 export const EXTRA_ROUTES: Routes = [
    { path: '', redirectTo: 'languages', pathMatch: 'full' },
    { path: 'languages', component: LanguagesComponent },
    { path: 'platforms', component: PlatformsComponent },
];