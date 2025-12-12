import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AccountService } from './core/services/account.service';
import { catchError, firstValueFrom, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAppInitializer(() => {
      const accountService = inject(AccountService);
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        return firstValueFrom(
          accountService.getUserInfo().pipe(
            catchError(() => of(null)) // Handle errors gracefully
          )
        );
      }
      return Promise.resolve();
      // return firstValueFrom(
      //   accountService.getUserInfo().pipe());
    }),
  ]
};
