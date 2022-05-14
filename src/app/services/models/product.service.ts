import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  createProduct(formData: any): Observable<any> {
    return this.http.post<any>(`${this._baseUrl}/product`, formData);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/product/${product.id}`,
      product);
  }

  getProduct(num: number, active: boolean = true): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/product/all/${active}?page=${num}`);
  }

  getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/product/one/${id}`);
  }

  deleteProduct(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/product/delete/${id}`, data);
  }
}
