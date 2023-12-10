import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import jwt_decode from 'jwt-decode';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserService } from 'src/app/services/user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  currentUser: any;
  userDetails: any = [];
  university_list: any = [];
  comments: any = [];
  university_count: any;
  page_num: number = 1;
  sort_order: string = "rankasc";
  search_institution: string = '';

  constructor(private storageService: StorageService,
    private userService: UserService, private commentsService: CommentsService,
    public universityService: UniversityService) { }

  ngOnInit(): void {
    this.currentUser = jwt_decode(this.storageService.getUser());
    this.retrieveUniversities();
    this.universityService.getUniversityCount();
  }

  retrieveUniversities() {
    const page_number = this.page_num;
    const sort_order = this.sort_order;

    this.universityService.getUniversities(sort_order, page_number).subscribe(response => {
      this.university_list = response
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
  deleteUniversity(universityID: any) {
    this.universityService.deleteUniversity(universityID).subscribe((response: any) => {
      window.location.reload();
    });
  }
}
