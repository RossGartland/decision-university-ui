import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
    constructor(public http: HttpClient,private storageService: StorageService) {}

    getUserDetails(id:any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/users/'+ id, { headers: {'x-access-token': this.storageService.getUser()} });
    }
}