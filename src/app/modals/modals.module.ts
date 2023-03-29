import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddCustomerComponent,
    DeleteCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ],
  exports: [
    AddCustomerComponent,
    DeleteCustomerComponent,
    EditCustomerComponent
  ]
})
export class ModalsModule { }
