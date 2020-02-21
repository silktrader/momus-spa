import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookReviewsComponent } from './pages/reviews/book-reviews.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { BookAddComponent } from './pages/book-add/book-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookReviewsComponent },
  { path: 'books/new', component: BookAddComponent },
  { path: 'books/:shortUrl', component: BookViewComponent },
  { path: 'books/:shortUrl/edit', component: BookAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
