import { Component } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { StorageService } from 'src/app/services/storage.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { ReactionsService } from 'src/app/services/reactions.service';

@Component({
    selector: 'university',
    templateUrl: './university.component.html',
    styleUrls: ['./university.component.css']
})

export class UniversityComponent {
    university_list: any = [];
    sort_order: string = "rankdesc";
    page_num: number = 1;
    comments: any = [];
    commentTotal: any = [];
    commentForm: any = [];
    currentUser: any;
    institutionName: any;
    isBookmarked: boolean = false;
    reaction: any = {};
    hasReacted: any;

    constructor(private universityService: UniversityService,
        private commentService: CommentsService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public authService: AuthService,
        private storageService: StorageService,
        private bookmarkService: BookmarkService,
        public reactionService: ReactionsService) { }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.required]
        });

        this.university_list = this.universityService.getUniversity(this.route.snapshot.params["id"]);
        this.retrieveComments();

        this.currentUser = jwt_decode(this.storageService.getUser());

        this.toggleBookmarked();
    }

    onSubmit() {
        this.commentService.postComment(this.commentForm.value, this.route.snapshot.params['id']).subscribe((response: any) => {
            console.log(this.commentForm.value)
            this.commentForm.reset();
            this.comments = this.retrieveComments();
        });

        this.commentForm.reset();
    }

    retrieveComments() {
        const page_number = this.page_num;
        const sort_order = this.sort_order;

        this.commentService.getComments(this.route.snapshot.params['id'], sort_order, page_number).subscribe(response => {
            console.log(response.comments);
            this.comments = response.comments;
            this.commentTotal = response.total;
        },
            error => {
                console.log(error);
            });
    }
    getPage(event: any) {
        this.page_num = event;
        this.retrieveComments();
    }
    sortAsc() {
        this.sort_order = "rankasc";
        this.retrieveComments();
    }

    sortDesc() {
        this.sort_order = "rankdesc";
        this.retrieveComments();
    }
    isInvalid(control: any) {
        return this.commentForm.controls[control].invalid &&
            this.commentForm.controls[control].touched;
    }

    isUntouched() {
        return this.commentForm.controls.comment.pristine;
    }
    isIncomplete() {
        return this.isInvalid('comment') ||
            this.isUntouched();
    }

    //Bookmark logic here
    addBookmark(institution: any) {
        this.bookmarkService.addBookmark(this.currentUser.user_id,
            this.route.snapshot.params["id"],
            institution).subscribe((response: any) => {
                window.location.reload();
                this.toggleBookmarked()
            });
    }

    removeBookmark() {
        this.bookmarkService.removeBookmark(this.currentUser.user_id,
            this.route.snapshot.params["id"]).subscribe((response: any) => {
                window.location.reload();
                this.toggleBookmarked()
            });
    }

    toggleBookmarked() {
        this.bookmarkService.isBookmarked(this.currentUser.user_id, this.route.snapshot.params["id"]).subscribe((response: any) => {
            this.isBookmarked = response.result;
        });
    }

    //Reaction logic here
    toggleReaction(commentID: any, reactionType: any) {
        this.reaction = {
            'reactionType': reactionType
        }
        this.reactionService.addReaction(this.route.snapshot.params["id"], commentID, this.reaction).subscribe((response: any) => {
            window.location.reload();
        },
            error => {
                this.reactionService.removeReaction(this.route.snapshot.params["id"], commentID).subscribe((response: any) => {

                })
            });
    }
    deleteComment(commentID: any) {
        this.commentService.removeComment(commentID, this.currentUser.user_id).subscribe((response: any) => {
            window.location.reload();
        });
    }
}