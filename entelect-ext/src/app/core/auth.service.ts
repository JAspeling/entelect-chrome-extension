import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private readonly http: HttpClient) {

    }

    public get<T>(url: string, options?: { headers: HttpHeaders }): Observable<T> {
        return this.http.get<T>(url, options);
    }
}
