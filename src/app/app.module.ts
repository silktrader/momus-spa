import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BookReviewsComponent } from './pages/reviews/book-reviews.component';
import { ShelfComponent } from './pages/reviews/shelf/shelf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MdePopoverModule } from '@material-extended/mde';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { BookAddComponent } from './pages/book-add/book-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginDialogComponent } from './dialogs/login/login-dialog.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ThousandsPipe } from './pipes/thousands.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookReviewsComponent,
    ShelfComponent,
    NavigationComponent,
    BookViewComponent,
    BookAddComponent,
    LoginDialogComponent,
    ThousandsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdePopoverModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
