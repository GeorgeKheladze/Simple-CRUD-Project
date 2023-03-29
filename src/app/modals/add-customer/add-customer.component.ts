import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CustomerApiService } from 'src/app/services/customer-api.service';
import { UpdateDataService } from 'src/app/services/update-data.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  @Input() showAddModal$!: Subject<boolean>;

  formSubmitted = false;

  customerDataForm!: FormGroup;

  unsubscriber$: Subject<number> = new Subject();

  constructor( private customerApiService: CustomerApiService, private updateDataService: UpdateDataService) {}

  ngOnInit(): void {
    this.createCustomerDataForm();
  }

  createCustomerDataForm() {
    this.customerDataForm = new FormGroup({
      id: new FormControl(),
      fullName: new FormControl('', { validators: [ Validators.required ], updateOn: 'blur' }),
      age: new FormControl('', { validators: [ Validators.required, Validators.min(18) ], updateOn: 'blur' }),
      phoneNumber: new FormControl('', Validators.required )
    });
  }

  onAddCustomer(addCustomerInfo: FormGroup) {
    if(addCustomerInfo.valid) {
      const customer: Customer = addCustomerInfo.value;
      this.customerApiService.addCustomer(customer).pipe(
        takeUntil(this.unsubscriber$)
      ).subscribe(
        {
          next: () => {
            this.updateDataService.updateData.next(true);
            this.onCancel();
          },
          error: () => {
            this.onCancel()
          }
        }
      );
    } else {
      this.formSubmitted = true;
    }
  }

  onCancel() {
    this.showAddModal$.next(false);
  }

  onOutsideClick() {
    this.onCancel()
  }

  onInsideModalClick(event: any){
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(-1);
    this.unsubscriber$.unsubscribe();
  }
}

