import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import * as PostsActions from "../../../app/state/posts/posts.actions";
import { Post } from "../../../models/post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
  imports: [FormsModule, CommonModule],
  standalone:true
})
export class PostCreateComponent {
  private store = inject(Store);

  constructor() {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const post: Post = { title: form.value.title, content: form.value.content, createdAt: new Date() };
    this.store.dispatch(PostsActions.addPost({ post }));
    form.resetForm();
  }
}
