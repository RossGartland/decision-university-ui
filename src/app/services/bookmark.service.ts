import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class BookmarkService {
    constructor(public http: HttpClient, private storageService: StorageService) { }

    comments: any;
    private bookmarkID: any;
    private bookmark: any;

    getBookmarks(id: any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/users/' + id + '/bookmarks', { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    addBookmark(user: any, institutionID: any, institutionName: string) {
        return this.http.post('http://127.0.0.1:5000/api/v1.0/users/' + user + '/bookmarks', { institutionID, institutionName }, { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    removeBookmark(user: any, institutionID: any) {
        return this.http.delete('http://127.0.0.1:5000/api/v1.0/users/' + user + '/bookmarks/' + institutionID, { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    isBookmarked(user: any, institutionID: string): Observable<any> {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/users/' + user + '/bookmarks/institution/' + institutionID, { headers: { 'x-access-token': this.storageService.getUser() } });
    }


}