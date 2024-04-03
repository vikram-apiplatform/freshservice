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

  connectToFreshservice(domain: any, apikey: any, password:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(apikey + ':' + password)
    });
    const url = 'https://' + domain + '.freshservice.com/api/v2/tickets'
    return this.http.get(url, { headers: headers })
      .pipe(map(res => res));
  }



}
