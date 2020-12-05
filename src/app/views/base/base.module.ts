import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module'
import { HomeComponent } from '../home/home.component';
import { AddUserStoryComponent } from '../user-story/add-user-story/add-user-story.component';
import { ListUserStoryComponent } from '../user-story/list-user-story/list-user-story.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [HomeComponent, ListUserStoryComponent, AddUserStoryComponent]
})
export class BaseModule { }
