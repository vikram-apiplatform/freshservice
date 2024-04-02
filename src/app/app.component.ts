import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  constructor(public dialog: MatDialog,private apiService:ApiService) {}

  ngOnInit() {
    
  }

  uploadFile() {
        const dialogRef = this.dialog.open(ImportFileDialogComponent, {
            width: '40%'
        });
        dialogRef.afterClosed().subscribe(async file => {
            if (file) {
              this.apiService.uploadCSV(file).subscribe(res=>{
                console.log(res);
                this.apiService.openSnackBar('Upload successful', 'Success');
              })
                const reader = new FileReader();
                reader.addEventListener('load', (event: any) => {
                    try {
                      console.log(reader);

                    } catch (e) {
                      this.apiService.openSnackBar('Please upload a valid file.', 'Error');
                    }
                });
                reader.readAsText(file);
            }
        });
  }
}