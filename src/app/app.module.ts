import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UniversitiesComponent } from './components/universities/universities.component';
import { AppComponent } from './app.component';
import { UniversityService } from './services/university.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UniversityComponent } from './components/university/university.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { CommentsService } from './services/comments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { HttpRequestInterceptor } from './helpers/auth.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookmarkService } from './services/bookmark.service';
import { UserService } from './services/user.service';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { AdminBoardComponent } from './components/admin/admin-board.component';
import { AddUniversityComponent } from './components/add-university/add-university.component';
import { EditUniversityComponent } from './components/edit-university/edit-university.component';
import { ReactionsService } from './services/reactions.service';

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'universities',
    component: UniversitiesComponent
  },
  {
    path: 'universities/:id',
    component: UniversityComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'comments/:id',
    component: EditCommentComponent
  },
  {
    path: 'admin',
    component: AdminBoardComponent
  },
  {
    path: 'add-university',
    component: AddUniversityComponent
  },
  {
    path: 'edit-university/:id',
    component: EditUniversityComponent
  },
];

@NgModule({
  declarations: [
    AppComponent, UniversitiesComponent, HomeComponent, EditCommentComponent,
    UniversityComponent, NavComponent, SignupComponent, LoginComponent,
    ProfileComponent, AdminBoardComponent, AddUniversityComponent, EditUniversityComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, NgxPaginationModule, NgChartsModule,
    RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule, MatIconModule,
    AuthModule.forRoot({
      domain: 'dev-fdamjqxacsp2fo4h.eu.auth0.com',
      clientId: '3Vvdr9B3wYijPYxJnXfISVe33DOsFKht'
    })
  ],
  providers: [UniversityService, CommentsService, HttpRequestInterceptor, BookmarkService, UserService, ReactionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
