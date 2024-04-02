import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-file-dialog',
  templateUrl: './import-file-dialog.component.html',
  styleUrls: ['./import-file-dialog.component.scss']
})
export class ImportFileDialogComponent implements OnInit {

  
  file:any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImportFileDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  onFileDropped(file:any) {
    this.file['item'] = file[0];
    this.file['progress'] = 0;
  }
  

fileBrowseHandler(inputElement: HTMLInputElement) {
  const files = inputElement.files;
  if (files && files.length > 0) {
    const selectedFile = files[0];
    this.file = {
      item: selectedFile,
      progress: 0
    };
  }
}

fileInputChange(event: any) {
  const inputElement = event.target as HTMLInputElement;
  this.fileBrowseHandler(inputElement);
}

  deleteFile() {
    if (confirm('Are you sure you want to delete this file?')) {
      this.file = {};
    }
  }

}
