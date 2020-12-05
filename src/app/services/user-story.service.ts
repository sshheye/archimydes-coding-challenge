import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Story } from '../models/story';

@Injectable({ providedIn: 'root' })
export class UserStoryService {
  public apiUrl: string = `${environment.apiRoot}/api/v1/stories`;
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  modifyStory(userStoryDTO: Story, isEdit: boolean) {
    if (isEdit)
      return this.http.put<any>(`${this.apiUrl}/${userStoryDTO.id}/${userStoryDTO.status}`, userStoryDTO);
    else
      return this.http.post<any>(`${this.apiUrl}`, userStoryDTO);
  }
  getStories() {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getStory(storyId: number) {
    return this.http.get<any>(`${this.apiUrl}/${storyId}`);
  }
}
