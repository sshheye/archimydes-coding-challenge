import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Story } from '../../../models/story';
import { UserStoryService } from '../../../services/user-story.service'
import { takeUntil } from 'rxjs/operators';
import { Subject, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles } from '../../../models/roles'
@Component({
  selector: 'app-add-user-story',
  templateUrl: './add-user-story.component.html',
  styleUrls: ['./add-user-story.component.scss']
})
export class AddUserStoryComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private userStoryService: UserStoryService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
  ) { }
  storyForm: FormGroup;
  public $unsubscribe = new Subject();
  story: Story;
  isEdit: boolean;
  canEditStatus: boolean;
  shouldDisableFormField: boolean;
  loading: boolean = true;
  storyId: number;
  public submitted: boolean;
  public submitting: boolean;
  storyTypes = [
    { label: 'Select Story Type', value: '', },
    { label: 'Enhancement', value: 'enhancement' },
    { label: 'Bugfix', value: 'bugfix' },
    { label: 'Development', value: 'development' },
    { label: 'QA', value: 'qa' }];
  complexityTypes = [
    { label: 'Select Complexity', value: '', },
    { label: 'Low', value: 'low' },
    { label: 'Mid', value: 'mid' },
    { label: 'High', value: 'high' }];


  ngOnInit() {
    this.storyId = this.route.snapshot.params.id;
    this.isEdit = !!this.storyId;
    this.canEditStatus = this.auth.currentUserValue?.role === Roles.ADMIN;
    this.shouldDisableFormField = this.isEdit && !this.canEditStatus;
    if (this.storyId) {
      this.userStoryService
        .getStory(this.storyId)
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe((result: any) => {
          this.story = result;
          this.buildForm(this.story);
        })
    }
    else {
      this.buildForm(this.story);
    }
  }

  private buildForm(story: Story) {
    this.storyForm = this.formBuilder.group({
      summary: [{ value: story?.summary, disabled: this.shouldDisableFormField }, Validators.required],
      description: [{ value: story?.description, disabled: this.shouldDisableFormField }, Validators.required],
      type: [{ value: story?.type || '', disabled: this.shouldDisableFormField }, Validators.required],
      complexity: [{ value: story?.complexity || '', disabled: this.shouldDisableFormField }, Validators.required],
      estimatedCompletionTime: [{ value: story?.estimatedHrs, disabled: this.shouldDisableFormField }],
      cost: [{ value: story?.cost, disabled: this.shouldDisableFormField }]
    });
    this.loading = false;
  }

  get f() { return this.storyForm.controls; }

  onStoryModified() {
    this.submitted = true;
    if (this.storyForm.invalid) {
      return;
    }
    this.submitting = true;
    const story: Story = this.extractStoryInFormInput()

    this.userStoryService
      .modifyStory(story, this.isEdit)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((c: any) => {
        this.router.navigate(['/user/user-stories']);
      })
  }
  private extractStoryInFormInput(): Story {
    return {
      complexity: this.f.complexity.value,
      description: this.f.description.value,
      summary: this.f.summary.value,
      type: this.f.type.value,
      cost: this.f.cost.value,
      estimatedHrs: this.f.estimatedCompletionTime.value,
      id: this.storyId
    };
  }

  setStatus(isStoryApproved: boolean) {
    this.submitting = true;
    const story = this.extractStoryInFormInput();
    story.status = isStoryApproved ? 'accepted' : 'rejected';
    this.userStoryService
      .modifyStory(story, this.isEdit)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => {
        this.router.navigate(['/user/user-stories']);
      }, () => {
        this.submitting = false;
        alert("Error occured while changing story status")
      })
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
