import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomerApiService } from 'src/app/services/customer-api.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent implements OnDestroy {
  @Input() showDeleteModal$!: Subject<boolean>;
  @Input() costumerId!: number;

  unsubscriber$: Subject<number> = new Subject();

  constructor( private customerApiService: CustomerApiService, private updateDataService: UpdateDataService ) {}

  onDeleteCustomer() {
    this.customerApiService.deleteCustomer(this.costumerId).pipe(
      takeUntil(this.unsubscriber$)
    ).subscribe(
      {
        next: () => {
          this.updateDataService.updateData.next(true);
          this.onCancel();
        },
        error: () => {
          this.onCancel();
        }
      }
    );
  }

  onCancel() {
    this.showDeleteModal$.next(false);
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
