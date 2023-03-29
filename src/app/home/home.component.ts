import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { CustomerApiService } from '../services/customer-api.service';
import { UpdateDataService } from '../services/update-data.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  customerId!: number;
  editableCustomerData!: Customer;
  customerList$!: Observable<any>;

  showAddModal$ = new Subject<boolean>();
  showDeleteModal$ = new Subject<boolean>();
  showEditModal$ = new Subject<boolean>();

  constructor( private customerApiService: CustomerApiService, private updateDataService: UpdateDataService ) {}

  ngOnInit(): void {
    this.customerList$ = this.updateDataService.updateData.pipe(
      switchMap(
        () => ( this.customerApiService.getCustomerList() )
      )
    )
  }

  onAddCustomer() {
    this.showAddModal$.next(true);
  }

  onDeleteCustomer(customerId: number) {
    this.customerId = customerId;
    this.showDeleteModal$.next(true);
  }

  onEditCustomer(customer: Customer) {
    this.editableCustomerData = customer;
    this.showEditModal$.next(true);
  }

}
