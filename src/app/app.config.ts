import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { routes } from './app.routes';
import { LoadingInterceptor } from './service/interceptors/loading.interceptor';
import { ErrorInterceptor } from './service/interceptors/error.interceptor';
import { AuthTokenInterceptor } from './service/interceptors/auth-token.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useValue: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
};
