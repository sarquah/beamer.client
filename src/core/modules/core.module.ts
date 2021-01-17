import { NgModule, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Optional } from '@angular/core';
import { AuthService } from '../services/auth.service';

@NgModule({
  providers: [
    AuthService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
