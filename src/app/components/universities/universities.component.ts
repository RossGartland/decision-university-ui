import { Component } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'universities',
    templateUrl: './universities.component.html',
    styleUrls: ['./universities.component.css'],
})

export class UniversitiesComponent {
    university_list: any = [];
    university_count: any;
    page_num: number = 1;
    sort_order: string = "rankasc";
    search_institution: string = '';

    constructor(public universityService: UniversityService) { }

    ngOnInit() {
        this.retrieveUniversities();
        this.universityService.getUniversityCount();
    }

    sortAsc() {
        this.sort_order = "rankasc";
        this.retrieveUniversities();
    }

    sortDesc() {
        this.sort_order = "rankdesc";
        this.retrieveUniversities();
    }
    retrieveUniversities() {
        const page_number = this.page_num;
        const sort_order = this.sort_order;

        this.universityService.getUniversities(sort_order, page_number).subscribe(response => {
            this.university_list = response;
        },
            error => {
                console.log(error);
            });
    }
    getPage(event: any) {
        this.page_num = event;
        this.retrieveUniversities();
    }

    searchThis(institution: any) {
        this.search_institution = institution;
        this.universityService.searchForUniversity(institution).subscribe(response => {
            this.university_list = response;
        },
            error => {
                console.log(error);
            });
    }

    onSearch(searchCriteria: any) {
        this.search_institution = searchCriteria;
        this.searchThis(searchCriteria);
    }
}