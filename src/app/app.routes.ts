import { Routes } from '@angular/router';
import { PaginaNonTrovataComponent } from './components/pagina-non-trovata/pagina-non-trovata.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
	/*{ path: '', redirectTo: '/home', pathMatch: 'full' },
	*/{ path: 'login', component: LoginComponent },/*
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{
		path: 'home/:idCalciatore',
		component: DettagliPartiteComponent,
		canActivate: [AuthGuard],
		resolve: { _: PartiteResolver }
	},*/
	{ path: '**', component: PaginaNonTrovataComponent }
];
