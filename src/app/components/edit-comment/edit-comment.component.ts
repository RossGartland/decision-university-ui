import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StorageService } from 'src/app/services/storage.service';
import { CommentsService } from 'src/app/services/comments.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'edit-comment',
    templateUrl: './edit-comment.component.html',
    styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent {

    commentForm: any = [];
    currentUser: any;

    constructor(public authService: AuthService,
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private commentService: CommentsService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.required]
        });

        this.currentUser = jwt_decode(this.storageService.getUser());
    }

    onSubmit() {
        this.commentService.editComment(this.currentUser.user_id,this.commentForm.value, this.route.snapshot.params['id']).subscribe((response: any) => {
            this.router.navigate(['profile']).then(() => {
                window.location.reload();
              });
        });

        this.commentForm.reset();
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

}