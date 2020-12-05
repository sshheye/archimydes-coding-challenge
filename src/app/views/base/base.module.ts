import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module'
import { HomeComponent } from '../home/home.component';
import { ListUserStoryComponent } from '../user-story/list-user-story/list-user-story.component';
@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule
  ],
  declarations: [HomeComponent, ListUserStoryComponent]
})
export class BaseModule { }
