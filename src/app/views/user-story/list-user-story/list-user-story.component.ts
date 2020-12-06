import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/models/story';
import { UserStoryService } from 'src/app/services/user-story.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user-story',
  templateUrl: './list-user-story.component.html',
  styleUrls: ['./list-user-story.component.scss']
})
export class ListUserStoryComponent implements OnInit {
  loading: boolean = true;

  constructor(private userStoryService: UserStoryService, private router: Router) { }
  public $unsubscribe = new Subject();
  stories: Story[] = [];
  filteredStories: Story[] = [];
  storyColorMap = { rejected: 'red', accepted: 'green', notFound: 'black' };
  sortString: string = 'type';
  filterByTypeString: string = 'Enhancement';
  storyTypes = ['Enhancement', 'Bugfix', 'Development', 'QA', 'All'];
  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
  getStoryMappingByColor(status: string) {
    if (!(status in this.storyColorMap))
      return this.storyColorMap.notFound
    return this.storyColorMap[status];
  }

  sortStories(reverseDirection: boolean = false) {
    const sortType = this.sortString;
    switch (sortType) {
      case 'type':
        this.sortStoriesByType(reverseDirection);
        break;
      case 'cost':
        this.sortStoriesByCost(reverseDirection);
      case 'complexity':
        this.sortStoriesByComplexity(reverseDirection);
      case 'estimatedHrs':
        this.sortStoriesByCompletionTime(reverseDirection);
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
  ngOnInit() {
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

  navigateToStory(storyId: any) {
    this.router.navigate([`user/user-stories/${storyId}/edit`])
  }
}
