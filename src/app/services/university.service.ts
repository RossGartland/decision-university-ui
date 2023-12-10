import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class UniversityService {
    constructor(public http: HttpClient, private storageService: StorageService) { }

    university_list: any;
    university_count: any;


    getUniversities(sort_order: string, page_num: number): Observable<any> {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities?sort=' + sort_order + '&pn=' + page_num);
    }

    getUniversityCount() {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities/count').subscribe((response: any) => {
            this.university_count = response;
        })
    }

    getUniversity(id: any) {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities/' + id);
    }

    searchForUniversity(institution: any): Observable<any> {
        return this.http.get('http://127.0.0.1:5000/api/v1.0/universities/search?institution=' + institution);
    }
    addUniversity(r2022: any, r2021: any, score: any, course: any,
        teaching: any, feedback: any, ratio: any, spend: any,
        tariff: any, career: any, continuation: any, institution: any) {

        return this.http.post('http://127.0.0.1:5000/api/v1.0/universities',
            {
                r2022, r2021, score, course, teaching, feedback,
                ratio, spend, tariff, career, continuation, institution
            },
            { headers: { 'x-access-token': this.storageService.getUser() } });
    }
    deleteUniversity(universityID: any) {
        return this.http.delete('http://127.0.0.1:5000/api/v1.0/universities/' + universityID, { headers: { 'x-access-token': this.storageService.getUser() } });
    }
    editUniversity(universityID: any, r2022: any, r2021: any, score: any, course: any,
        teaching: any, feedback: any, ratio: any, spend: any,
        tariff: any, career: any, continuation: any, institution: any) {
        return this.http.put('http://127.0.0.1:5000/api/v1.0/universities/' + universityID,
            {
                r2022, r2021, score, course, teaching, feedback,
                ratio, spend, tariff, career, continuation, institution
            },
            { headers: { 'x-access-token': this.storageService.getUser() } });
    }
}
