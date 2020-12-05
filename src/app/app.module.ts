import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserStoryComponent } from './views/user-story/list-user-story/list-user-story.component';
import { SignInComponent } from './views/account/signin/sign-in.component';
import { HomeComponent } from './views/home/home.component';
import { ToggleButtonComponent } from './views/toggle-button/toggle-button.component';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './views/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ToggleButtonComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
