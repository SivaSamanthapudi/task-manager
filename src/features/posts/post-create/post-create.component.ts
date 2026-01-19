import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { PostsService } from "../../../services/posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
  imports: [FormsModule, CommonModule],
  standalone:true
})
export class PostCreateComponent {

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content, new Date());
    form.resetForm();
  }
}
