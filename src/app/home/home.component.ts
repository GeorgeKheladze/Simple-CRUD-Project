import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { CustomerApiService } from '../services/customer-api.service';
import { UpdateDataService } from '../services/update-data.service';
import { Customer } from '../models/customer.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  langStatus!: boolean;
  customerId!: number;
  editableCustomerData!: Customer;
  customerList$!: Observable<Customer[]>;

  showAddModal$ = new Subject<boolean>();
  showDeleteModal$ = new Subject<boolean>();
  showEditModal$ = new Subject<boolean>();

  constructor( private customerApiService: CustomerApiService, private updateDataService: UpdateDataService, private translateService: TranslateService ) {}

  ngOnInit(): void {
    this.customerList$ = this.updateDataService.updateData.pipe(
      switchMap(
        () => ( this.customerApiService.getCustomerList() )
      )
    );

    this.useLang();
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

  onChangeLang() {
    const language = this.langStatus ? 'EN' : 'KA';
    this.translateService.use(language);

    this.langStatus = !this.langStatus;

    if(this.langStatus == false) {
      localStorage.setItem('language', 'EN');
    } else {
      localStorage.setItem('language', 'KA');
    }
  }

  useLang() {
    const lang = localStorage.getItem('language');

    if (lang === 'KA') {
      this.langStatus = true;
      this.translateService.use('KA')
    } else {
      this.langStatus = false;
      this.translateService.use('EN');
    }
  }

}
