import { ApplicationConfig, provideZonelessChangeDetection, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbThemeModule, NbSidebarModule, NbMenuModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule, NbInputModule, NbBadgeModule, NbSpinnerModule, NbAlertModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import * as Highcharts from 'highcharts';
import { provideHighcharts } from 'highcharts-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideHighcharts({
      instance: () => Promise.resolve(Highcharts as any)
    }),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'corporate' }),
      NbLayoutModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbCardModule,
      NbButtonModule,
      NbIconModule,
      NbEvaIconsModule,
      NbInputModule,
      NbBadgeModule,
      NbSpinnerModule,
      NbAlertModule,
      NbTooltipModule,
      NbUserModule,
    ),
  ]
};
