/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListUserStoryComponent } from './list-user-story.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListUserStoryComponent', () => {
  let component: ListUserStoryComponent;
  let fixture: ComponentFixture<ListUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ListUserStoryComponent],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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

});
