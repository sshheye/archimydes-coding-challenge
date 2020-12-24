import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserStoryComponent } from '../user-story/list-user-story/list-user-story.component';
import { AddUserStoryComponent } from '../user-story/add-user-story/add-user-story.component';
import { UserAuthGuard } from '../../guards/UserAuthGuard'
import { AdminAuthGuard } from '../../guards/AdminAuthGuard'
import { HomeComponent } from '../home/home.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'user/user-stories',
    component: ListUserStoryComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'user/user-stories/add',
    component: AddUserStoryComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'user/user-stories/:id/edit',
    component: AddUserStoryComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'admin/user-stories',
    component: ListUserStoryComponent,
    canActivate: [AdminAuthGuard],
  },]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
