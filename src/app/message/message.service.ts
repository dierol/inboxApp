import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { StorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  endpoint: string = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  list() {
    return this.http.get<Message[]>(this.endpoint);
  }

  get(id: string) {
    return this.storageService.get('message'+id).then(
      message => {
        if (!!message) {
          return message;
        } else {
          let message = this.http.get<Message>(this.endpoint+'/'+id).toPromise();
          message.then(data => {
            this.storageService.set('message'+id, data)
          });
          return message;
        }
      }
    );
  }

  getFolderMessageById(id: string) {
    return this.http.get<Message[]>(this.endpoint+'?folder_id='+id);
  }
}
