import { addGroup } from './../../backend/controllers/groups.controller';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GROUPS_API_URL, TASKS_API_URL } from '../utils/constants/url.constants';
import { Task } from '../models/task.model';
import { ITEMS_PER_PAGE } from '../utils/constants/constants';
import { Group } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private _groups = signal<{ groups: Group[]; count: number }>({ groups: [], count: 0 });
  groups = computed(() => this._groups().groups);
  groupsCount = computed(() => this._groups().count);

  constructor(private http: HttpClient) {}

  addGroup(group?: Group) {
    const payload = {
      title: 'Andamana Trip',
      description: 'Best trip is going to happen',
      currency: 'INR',
      createdOn: Date.now(),
      expenses: [],
    };
    this.http.post<any>(GROUPS_API_URL, payload).subscribe((res) => {
      this._groups.set({ groups: [...this.groups(), res.group], count: this.groupsCount() + 1 });
    });
  }

 getGroups() {
  this.http.get<any>(GROUPS_API_URL).subscribe((res) => {
    const groups:[] = res.groups.map((g: any) => ({
      ...g,
      createdOn: new Date(g.createdOn),
    }));

    this._groups.set({
      groups,
      count: res.count,
    });
  });
}

}
