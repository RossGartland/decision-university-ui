import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import jwt_decode from 'jwt-decode';
import { UniversityService } from 'src/app/services/university.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent implements OnInit {
  currentUser: any;
  form: any = {
    r2022: null,
    r2021: null,
    score: null,
    course: null,
    teaching: null,
    feedback: null,
    ratio: null,
    spend: null,
    tariff: null,
    career: null,
    continuation: null,
    institution: null,
  };
  university_list: any = [];
  isSuccessful = false;
  isFailure = false;
  errorMessage = '';

  constructor(private storageService: StorageService,
    public universityService: UniversityService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.setUniversity();
    this.currentUser = jwt_decode(this.storageService.getUser());
  }
  onSubmit() {
    const { r2022, r2021, score, course, teaching, feedback,
      ratio, spend, tariff, career, continuation, institution } = this.form;

    this.universityService.editUniversity(this.route.snapshot.params['id'], r2022, r2021, score, course, teaching, feedback,
      ratio, spend, tariff, career, continuation, institution).subscribe({
        next: response => {
          this.router.navigate(['admin']);
        },
        error: e => {
          this.errorMessage = e.error.message;
          this.isFailure = true;
        }
      });
  }
  setUniversity() {
    this.universityService.getUniversity(this.route.snapshot.params["id"]).subscribe({
      next: response => {
        this.university_list = response;
        this.form = {
          r2022: this.university_list[0].r2022,
          r2021: this.university_list[0].r2021,
          score: this.university_list[0].score,
          course: this.university_list[0].course,
          teaching: this.university_list[0].teaching,
          feedback: this.university_list[0].feedback,
          ratio: this.university_list[0].ratio,
          spend: this.university_list[0].spend,
          tariff: this.university_list[0].tariff,
          career: this.university_list[0].career,
          continuation: this.university_list[0].continuation,
          institution: this.university_list[0].institution,
        }
      },
      error: e => {
        console.log(e);
      }
    })
  }
}
