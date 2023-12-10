import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import jwt_decode from 'jwt-decode';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserService } from 'src/app/services/user.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userDetails: any = [];
  bookmark_list: any = [];
  comments: any = [];

  constructor(private storageService: StorageService, private bookmarkService: BookmarkService,
    private userService: UserService, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.currentUser = jwt_decode(this.storageService.getUser());
    this.userDetails = this.userService.getUserDetails(this.currentUser.user_id);
    this.bookmark_list = this.bookmarkService.getBookmarks(this.currentUser.user_id);
    this.comments = this.commentsService.getCommentsByUserID(this.currentUser.user_id);
  }

  deleteBookmark(id: any) {
    this.bookmarkService.removeBookmark(this.currentUser.user_id,
      id).subscribe((response: any) => {
        window.location.reload();
      });
  }
  deleteComment(commentID: any) {
    this.commentsService.removeComment(commentID, this.currentUser.user_id).subscribe((response: any) => {
      window.location.reload();
    });
  }
}
