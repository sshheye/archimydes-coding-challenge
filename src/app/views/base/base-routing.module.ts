import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserStoryComponent } from '../user-story/list-user-story/list-user-story.component';
import { UserAuthGuard } from '../../guards/UserAuthGuard'
import { AdminAuthGuard } from '../../guards/AdminAuthGuard'
import { HomeComponent } from '../home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'user/user-stories',
    component: ListUserStoryComponent,
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
