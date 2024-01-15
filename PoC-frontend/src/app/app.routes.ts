import { Routes } from '@angular/router';
import { ClientHomeComponent } from './components/client-homepage/client-home/client-home.component';
import { LoginComponent } from './components/login-page/login.component'
import { RestaurateurHomeComponent } from './components/restaurateur-homepage/restaurateur-home/restaurateur-home.component';
import { RestaurantDetailsPageComponent } from './components/client-homepage/restaurant-details-page/restaurant-details-page.component';
import { AuthGuard } from './guards/login.guard';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'restaurateur-home',
        component: RestaurateurHomeComponent,
        title: 'Home',
        //canActivate: [AuthGuard]
    },

    {
        path: 'client-home',
        component: ClientHomeComponent,
        title: 'Home'
    },
    {
        path: 'restaurant-details-page/:id',
        component: RestaurantDetailsPageComponent,
        title: 'Restaurant Details Page'
    }
];

