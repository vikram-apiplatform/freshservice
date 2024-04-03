import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient, public _snackBar: MatSnackBar) {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 2500
    });
  }

  uploadCSV(file: File, columns: any): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('columns', JSON.stringify(columns));

    const headers = new HttpHeaders();

    const url = 'https://transformer.apiplatform.io/v1/validate/csv';
    return this.http.post(url, formData, { headers })
      .pipe(map(res => res));
  }

  connectToFreshservice(domain: any, apikey: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(apikey + ':')
    });
    const url = 'https://' + domain + '.freshservice.com/api/v2/tickets'
    return this.http.get(url, { headers: headers })
      .pipe(map(res => res));
  }


  getTranformDataWorkflowDetails(workflowRunId: any) {
    const coreOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'pkey': '3feee3f13ffecbc23fdcb845d0b9359a',
        'apikey': 'WroK6tWEFqf6lOtO7J1qJPXCZUc8Ai24',
        'Access-Control-Allow-Origin': '*',
        'observe': 'response'
      })
    };
    const url = 'https://core.gateway.apiplatform.io/v1/workflowRun?workflowRunId=' + workflowRunId;
    return this.http.get(url, coreOptions)
      .pipe(map(res => res));
  }



}
