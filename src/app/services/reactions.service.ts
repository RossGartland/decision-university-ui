import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class ReactionsService {
    constructor(public http: HttpClient, private storageService: StorageService) { }

    reactions: any;

    getReactionCount(universityID: any, commentID: any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities/' + universityID + '/comments/'
            + commentID + '/reactions');
    }

    addReaction(universityID: any, commentID: any, reactionType: any) {
        return this.http.post('http://127.0.0.1:5000/api/v1.0/universities/' + universityID + '/comments/'
            + commentID + '/reactions',
            reactionType,
            { headers: { 'Content-Type': 'application/json', 'x-access-token': this.storageService.getUser() } });
    }

    removeReaction(universityID: any, commentID: any) {
        return this.http.delete('http://127.0.0.1:5000/api/v1.0/universities/' + universityID + '/comments/'
            + commentID + '/reactions',
            { headers: { 'x-access-token': this.storageService.getUser() } });
    }
}
