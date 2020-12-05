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
  storyByColorMapping = { rejected: 'red', accepted: 'green' };
  sortString: string = 'type';
  filterByTypeString: string = 'Enhancement';
  storyTypes = ['Enhancement', 'Bugfix', 'Development', 'QA', 'All'];
  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
  getStoryMappingByColor(status: string) {
    if (!(status in this.storyByColorMapping))
      return 'black'
    return this.storyByColorMapping[status];
  }

  sortStories() {
    const sortType = this.sortString;
    console.log(sortType)
    switch (sortType) {
      case 'type':
        this.sortStoriesByType();
        break;
      case 'cost':
        this.sortStoriesByCost();
      case 'complexity':
        this.sortStoriesByComplexity();
      case 'estimatedHrs':
        this.sortStoriesByCompletionTime();
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

  sortStoriesByCost() {
    this.filteredStories.sort((a, b) => a.cost - b.cost);
  }

  sortStoriesByType() {
    this.filteredStories.sort((a, b) => a.type.localeCompare(b.type));
  }
  sortStoriesByComplexity() {
    this.filteredStories.sort((a, b) => a.complexity.localeCompare(b.complexity));
  }
  sortStoriesByCompletionTime() {
    this.filteredStories.sort((a, b) => a.estimatedHrs - b.estimatedHrs);
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
    this.router.navigate([`user/user-stories/${storyId}/view`])
  }
}
