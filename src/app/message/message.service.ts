import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { Message } from './message';
import { StorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  endpoint: string = 'http://localhost:3000/messages';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private loadingController: LoadingController
  ) { }

  list() {
    let messages = this.http.get<Message[]>(this.endpoint).toPromise();
    return messages;
  }

  get(id: number) {
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
  };

  delete(id: number) {
    let message = this.http.delete(this.endpoint+'/'+id).toPromise();
    return message;
  };

  async getFolderMessagesById(id: string, offset: number = 0) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    let messages = this.http.get<Message[]>(this.endpoint+'?folder_id='+id+'&_limit=15&_start='+offset).toPromise();
    return messages;
  }
}
