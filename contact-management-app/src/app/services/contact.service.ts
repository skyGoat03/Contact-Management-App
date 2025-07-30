import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, CreateContactRequest, UpdateContactRequest } from '../models/contact.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = 'https://f626c796-87d3-48fd-b89f-155003dcc8b2.mock.pstmn.io/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.API_URL}/contacts/`, {
      headers: this.getHeaders()
    });
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.API_URL}/contacts/${id}`, {
      headers: this.getHeaders()
    });
  }

  createContact(contact: CreateContactRequest): Observable<Contact> {
    return this.http.post<Contact>(`${this.API_URL}/contacts/`, contact, {
      headers: this.getHeaders()
    });
  }

  updateContact(id: string, contact: UpdateContactRequest): Observable<Contact> {
    return this.http.put<Contact>(`${this.API_URL}/contacts/${id}`, contact, {
      headers: this.getHeaders()
    });
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/contacts/${id}`, {
      headers: this.getHeaders()
    });
  }
}
