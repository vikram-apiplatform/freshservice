import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class AppComponent {

  columns: any = [
    {
      "attributeName": "TicketId",
      "required": true,
      "type": "number"
    },
    {
      "attributeName": "Subject",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Description",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Type",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Status",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Priority",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "AgentEmail",
      "required": true,
      "type": "string",
      "validationType": "email"
    },
    {
      "attributeName": "AgentName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactEmail",
      "required": true,
      "type": "string",
      "validationType": "email"
    },
    {
      "attributeName": "CompanyName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactPhone",
      "required": true,
      "type": "number",
      "validationType": "phone"
    },
    {
      "attributeName": "Tags",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "DepartmentName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "CreatedTime",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "UpdatedTime",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ClosedTime",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Attachments",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "CC Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Deleted",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Due By",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Email Config ID",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FR Due By",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FR Escalated",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FWD Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Is Escalated",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Sub Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Item Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Reply CC Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Source",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Spam",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "To Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Urgency",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Impact",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Resolution Notes",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Application_select",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Functional Area_select",
      "required": true,
      "type": "string"
    }
  ];
  apikey:any;
  password:any;
  file:any;

  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {

  }

  uploadFile() {
    const dialogRef = this.dialog.open(ImportFileDialogComponent, {
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(async file => {
      if (file) {
        this.file = file;
        this.apiService.uploadCSV(file, this.columns).subscribe(res => {
          console.log(res);
          this.apiService.openSnackBar('Upload successful', 'Success');
        }, err => {
          this.apiService.openSnackBar(err, 'Error');
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
