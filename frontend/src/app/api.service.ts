import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:3000';
  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  constructor(private httpClient: HttpClient) { }

  parse_link_header(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach(p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="'.*"/, '$1').trim();
      links[name] = url;
    });

    return links;

  }

  public createContact(contact: Contact) {
    return this.httpClient.post(`${this.apiUrl}/contacts/`, contact);
  }

  public updateContact(contact: Contact) {
    return this.httpClient.put(`${this.apiUrl}/contacts/${contact.id}`, contact);
  }

  public deleteContact(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/contacts/${id}`);
  }

  public getContacts(url?: string) {
    if (url) {
      return this.httpClient.get<Contact[]>(url, { observe: 'response'}).pipe(
        tap(res => {
          const Link = this.parse_link_header(res.headers.get('Link'));
          this.first = Link['first'];
          this.last = Link['last'];
          this.prev = Link['prev'];
          this.next = Link['next'];
        })
      );
    }
    return this.httpClient.get<Contact[]>(`${this.apiUrl}/contacts?_page=1`, {observe: 'response'}).pipe(
      tap(res => {
        const Link = this.parse_link_header(res.headers.get('Link'));
        this.first = Link['first'];
        this.last = Link['last'];
        this.prev = Link['prev'];
        this.next = Link['next'];
      }));
  }

  public getContactById(id: number) {
    return this.httpClient.get(`${this.apiUrl}/contacts/${id}`);
  }

}
