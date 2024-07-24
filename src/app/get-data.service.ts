import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private _HttpClient: HttpClient) {}

  getTrans(): Observable<any> {
    return this._HttpClient.get(
      `https://customer-transaction-api.onrender.com/transactions`
    );
  }

  getCustomers(param:any=''): Observable<any> {
    return this._HttpClient.get(
      `https://customer-transaction-api.onrender.com/customers${param}`
    );
  }
}
