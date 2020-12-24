import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';
import { UserStoryService } from 'src/app/services/user-story.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-list-user-story',
  templateUrl: './list-user-story.component.html',
  styleUrls: ['./list-user-story.component.scss']
})
export class ListUserStoryComponent implements OnInit {
  constructor(
    private userStoryService: UserStoryService,
    private router: Router,
    public auth: AuthenticationService) { }

  public $unsubscribe = new Subject();
  loading: boolean = true;
  canEditStatus: boolean;
  stories: Story[] = [];
  filteredStories: Story[] = [];

  storyColorMap = { rejected: 'red', accepted: 'green', notFound: 'black' };
  sortString: string;
  filterByTypeString: string = 'Enhancement';
  storyTypes = ['Enhancement', 'Bugfix', 'Development', 'QA', 'All'];
  isSortDirectionReversed: boolean;
  ngOnInit() {
    this.canEditStatus = this.auth.currentUserValue?.role === Roles.ADMIN;
    this.sortString = this.canEditStatus ? 'type' : 'id';
    this.userStoryService.getStories()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(results => {
        this.stories = results;
        this.loading = false;
        this.filteredStories = this.stories;
      }, () => {
        this.loading = false;
      })
  }

  getStoryMappingByColor(status: string) {
    if (!(status in this.storyColorMap))
      return this.storyColorMap.notFound
    return this.storyColorMap[status];
  }

  sortStories() {
    this.isSortDirectionReversed = !this.isSortDirectionReversed;
    const sortType = this.sortString;
    switch (sortType) {
      case 'id':
        this.sortStoriesByID(this.isSortDirectionReversed);
      case 'type':
        this.sortStoriesByType(this.isSortDirectionReversed);
        break;
      case 'cost':
        this.sortStoriesByCost(this.isSortDirectionReversed);
        break;
      case 'complexity':
        this.sortStoriesByComplexity(this.isSortDirectionReversed);
        break;
      case 'estimatedHrs':
        this.sortStoriesByCompletionTime(this.isSortDirectionReversed);
        break;
      default:
        break;
    }
  }

  filterStoriesByType() {
    const storyType = this.filterByTypeString;
    if (storyType === 'All') {
      this.filteredStories = this.stories;
      return;
    }
    this.filteredStories = this.stories.filter(story => story.type.toLocaleLowerCase() === storyType.toLocaleLowerCase());
  }

  sortStoriesByCost(reverseDirection: boolean) {
    if (reverseDirection) {
      this.filteredStories.sort((a, b) => a.cost - b.cost);
      return;
    }
    this.filteredStories.sort((a, b) => b.cost - a.cost);
  }

  sortStoriesByType(reverseDirection: boolean) {
    if (reverseDirection) {
      this.filteredStories.sort((a, b) => a.type.localeCompare(b.type));
      return;
    }
    this.filteredStories.sort((a, b) => b.type.localeCompare(a.type));

  }

  sortStoriesByComplexity(reverseDirection: boolean) {
    if (reverseDirection) {
      this.filteredStories.sort((a, b) => a.complexity.localeCompare(b.complexity));
      return;
    }
    this.filteredStories.sort((a, b) => b.complexity.localeCompare(a.complexity));
  }

  sortStoriesByCompletionTime(reverseDirection: boolean) {
    if (reverseDirection) {
      this.filteredStories.sort((a, b) => a.estimatedHrs - b.estimatedHrs);
      return;
    }
    this.filteredStories.sort((a, b) => b.estimatedHrs - a.estimatedHrs);
  }

  sortStoriesByID(reverseDirection: boolean) {
    if (reverseDirection) {
      this.filteredStories.sort((a, b) => a.id - b.id);
      return;
    }
    this.filteredStories.sort((a, b) => b.id - a.id);
  }
  navigateToStory(storyId: any) {
    this.router.navigate([`user/user-stories/${storyId}/edit`])
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
