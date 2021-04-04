import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8080/api/supportContact';

@Injectable({
  providedIn: 'root'
})

export class ContactoService {

  constructor(private http: HttpClient) { }

  createContact(data): Observable<any> {
    console.log("Data in service: "+JSON.stringify(data));
    return this.http.post(baseUrl, data);
  }
}
