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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookReviewsComponent,
    ShelfComponent,
    NavigationComponent,
    BookViewComponent,
    BookAddComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
