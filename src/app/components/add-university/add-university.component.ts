import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import jwt_decode from 'jwt-decode';
import { UniversityService } from 'src/app/services/university.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
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
  isSuccessful = false;
  isFailure = false;
  errorMessage = '';

  constructor(private storageService: StorageService,
    public universityService: UniversityService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = jwt_decode(this.storageService.getUser());
  }

  onSubmit() {
    const { r2022, r2021, score, course, teaching, feedback,
      ratio, spend, tariff, career, continuation, institution } = this.form;

    this.universityService.addUniversity(r2022, r2021, score, course, teaching, feedback,
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
}
