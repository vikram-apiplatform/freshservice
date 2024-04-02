import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    
  }

  uploadFile() {
        const dialogRef = this.dialog.open(ImportFileDialogComponent, {
            width: '40%'
        });
        dialogRef.afterClosed().subscribe(async file => {
            if (file) {
                const reader = new FileReader();
                reader.addEventListener('load', (event: any) => {
                    try {
                      console.log(reader);

                    } catch (e) {
                      this._snackBar.open('Please upload a valid file.', 'Error');
                        
                    }
                });
                reader.readAsText(file);
            }
        });
  }
}