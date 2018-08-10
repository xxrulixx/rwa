import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatListModule, MatSidenavModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatListModule, MatSidenavModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
