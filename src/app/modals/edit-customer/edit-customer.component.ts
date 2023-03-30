import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CustomerApiService } from 'src/app/services/customer-api.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  @Input() showEditModal$!: Subject<boolean>;
  @Input() editableCustomerData!: Customer;

  formSubmitted = false;

  customerDataForm!: FormGroup;

  unsusbscriber$: Subject<number> = new Subject();

  constructor( private customerApiServices: CustomerApiService, private updateDataServices: UpdateDataService) {}

  ngOnInit(): void {
    this.createCustomerDataForm();
  }

  createCustomerDataForm() {
    this.customerDataForm = new FormGroup({
      id: new FormControl(this.editableCustomerData.id),
      fullName: new FormControl(this.editableCustomerData.fullName, { validators: [ Validators.required ], updateOn: 'blur' }),
      age: new FormControl(this.editableCustomerData.age, { validators: [ Validators.required, Validators.min(18) ], updateOn: 'blur' }),
      phoneNumber: new FormControl(this.editableCustomerData?.phoneNumber, { validators:[ Validators.required, Validators.pattern(/^\d{3}\s?\d{3}\s?\d{3}$/) ] } )
    });
  }

  onDoneEdit(updatedCustomerInfo: FormGroup) {
    if(updatedCustomerInfo.valid) {
      const customer: Customer = updatedCustomerInfo.value;
      this.customerApiServices.editCustomer(this.editableCustomerData.id, customer).pipe(
        takeUntil(this.unsusbscriber$)
      ).subscribe(
        {
          next: () => {
            this.updateDataServices.updateData.next(true);
            this.onCancel();
          },
          error: () => {
            this.updateDataServices.updateData.next(true);
            this.onCancel();
          }
        }
      );
    } else {
      this.formSubmitted = true;
    }
  }

  onCancel() {
    this.showEditModal$.next(false);
    return false;
  }

  onOutsideClick() {
    this.onCancel()
  }

  onInsideModalClick(event: any){
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.unsusbscriber$.next(-1);
    this.unsusbscriber$.unsubscribe();
  }
}
