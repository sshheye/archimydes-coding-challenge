/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListUserStoryComponent } from './list-user-story.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('List User Story Component', () => {
  let component: ListUserStoryComponent;
  let fixture: ComponentFixture<ListUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule,],
      declarations: [ListUserStoryComponent],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserStoryComponent);
    component = fixture.componentInstance;

    component.stories = [
      { id:1, summary: 'test', complexity: 'low', cost: 1, description: 'test', estimatedHrs: 2, type: 'bugfix' },
      { id:2, summary: 'test2', complexity: 'high', cost: 2, description: 'test2', estimatedHrs: 4, type: 'QA' }];
    component.filteredStories = component.stories;
    component.loading = false;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return color based on story status', () => {
    const noFound = component.getStoryMappingByColor(null);
    const accepted = component.getStoryMappingByColor('accepted');
    const rejected = component.getStoryMappingByColor('rejected');

    expect(noFound).toBe("black");
    expect(accepted).toBe("green");
    expect(rejected).toBe("red");

  });

  it('should sort stories by type', () => {
    const isReversed: boolean = true;
    component.sortStoriesByType(!isReversed);
    expect(component.filteredStories[0].type).toBe('QA');
  });

  it('should sort stories by cost', () => {
    const isReversed: boolean = true;
    component.sortStoriesByType(!isReversed);
    expect(component.filteredStories[0].cost).toBe(2);
  });

  it('should sort stories by complexity', () => {
    const isReversed: boolean = true;
    component.sortStoriesByType(!isReversed);
    expect(component.filteredStories[0].complexity).toBe('high');
  });

  it('should sort stories by estimatedHrs', () => {
    const isReversed: boolean = true;
    component.sortStoriesByType(!isReversed);
    expect(component.filteredStories[0].estimatedHrs).toBe(4);
  });

  it('should sort stories by ID', () => {
    const isReversed: boolean = true;
    component.sortStoriesByID(!isReversed);
    expect(component.filteredStories[0].id).toBe(2);
  });

});
