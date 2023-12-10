import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class CommentsService {
    constructor(public http: HttpClient, private storageService: StorageService) { }

    comments: any;
    private universityID: any;

    getComments(id: any, sort_order: string, page_num: number): Observable<any> {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities/' + id + '/comments?sort=' + sort_order + '&pn=' + page_num);
    }
    getCommentByID(id: any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/comments/' + id, { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    getBusiness(id: any) {
        this.universityID = id;
        return this.http.get(
            'http://localhost:5000/api/v1.0/universities/' + id);
    }

    postComment(comment: any, route: any) {
        let postData = new FormData();
        postData.append("text", comment.comment);

        console.log(postData);

        return this.http.post('http://127.0.0.1:5000/api/v1.0/universities/' + route + '/comments', postData, { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    getCommentsByUserID(id: any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/users/' + id + '/comments', { headers: { 'x-access-token': this.storageService.getUser() } });
    }

    removeComment(commentID: any, universityID: any) {
        return this.http.delete('http://127.0.0.1:5000/api/v1.0/users/' + universityID + '/comments/' + commentID, { headers: { 'x-access-token': this.storageService.getUser() } });
    }
    editComment(userID: any, comment: any, commentID: any) {
        let postData = new FormData();
        postData.append("text", comment.comment);
        return this.http.put('http://127.0.0.1:5000/api/v1.0/users/' + userID + '/comments/' + commentID, postData, { headers: { 'x-access-token': this.storageService.getUser() } });
    }
}
