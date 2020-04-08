import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  endpoint: string = 'https://jsonplaceholder.typicode.com/messages';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Message[]>(this.endpoint);
  }

  get(id: string) {
    return this.http.get<Message>(this.endpoint+'/'+id);
  }

  getFolderMessageById(id: string) {
    return this.http.get<Message[]>(this.endpoint+'?folder_id='+id);
  }
}
