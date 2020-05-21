import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Links } from '../models/link';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class LinksService {
    constructor(private readonly authService: AuthService) {
        
    }

    public getLinks(): Observable<Links> {
        return this.authService.get(`${environment.state.api}links`);
    }
}