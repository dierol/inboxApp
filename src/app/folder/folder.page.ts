import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FolderService } from './folder.service';
import { Folder } from './folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folders: Folder[];

  constructor(
    private router: Router,
    private folderService: FolderService
  ) { };

  ngOnInit() {
    this.folderService.list().then(
      folders => {
        this.folders = folders;
      }
    );
  };

  openFolder(id: string) {
    this.router.navigate(['message', id])
  };

}
