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
  MatChipsModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatListModule, MatSidenavModule,
    MatChipsModule, MatSelectModule, MatInputModule, MatCheckboxModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatListModule, MatSidenavModule,
    MatChipsModule, MatSelectModule, MatInputModule, MatCheckboxModule
  ]
})
export class MaterialModule {}
