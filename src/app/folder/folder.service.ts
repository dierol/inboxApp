import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { Folder } from './folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  endpoint: string = 'http://localhost:3000/folders/';

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) { }

  async list() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    let folders = this.http.get<Folder[]>(this.endpoint).toPromise();
    return folders;
  }

  get(id: number) {
    let folder = this.http.get<Folder>(this.endpoint+id).toPromise();
    return folder;
  }
}
