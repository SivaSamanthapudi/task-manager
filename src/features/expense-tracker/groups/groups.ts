import { Component, inject, Signal } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.html',
  styleUrl: './groups.scss',
})
export class GroupsComponent {
  private groupService = inject(GroupsService);
  groups: Signal<Group[]> = this.groupService.groups;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.groupService.getGroups();
  }

  onEdit(group: any) {}

  onView(){

  }

  onDelete(groupId: string) {}

  onAddGroup() {
    this.groupService.addGroup();
  }

  onAddExpense(){
    
  }
}
