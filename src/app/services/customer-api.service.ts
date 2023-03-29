import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor( private http: HttpClient ) { }

  getCustomerList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl + '/customers'}`)
  }

  addCustomer(customerInfo: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiUrl}/customers`, customerInfo);
  }

  deleteCustomer(customerId: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.apiUrl + '/customers/' + customerId}`)
  }

  editCustomer(customerId: number, customerInfo: Customer) {
    return this.http.put(`${environment.apiUrl + '/customers/' + customerId}`, customerInfo)
  }
}
