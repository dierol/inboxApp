import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from './folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  endpoint: string = 'http://localhost:3000/folders/';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Folder[]>(this.endpoint);
  }

  get(id: string) {
    return this.http.get<Folder>(this.endpoint+id);
  }
}
