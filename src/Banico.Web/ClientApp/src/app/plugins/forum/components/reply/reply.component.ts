import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReplyService } from '../../services/reply.service';
import { ReplyCommentService } from '../../services/reply-comment.service';
import { Reply } from '../../entities/reply';
import { ReplyComment } from '../../entities/reply-comment';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  public reply: Reply;
  public replyComments: ReplyComment[];
  private _id: string;
  
  constructor(
    private replyService: ReplyService,
    private replyCommentService: ReplyCommentService
    ) {
  }

  @Input()
  set id(id: string) {
    this._id = id;
    this.replyService.get(id)
    .subscribe(reply => this.set(reply));
  }

  private set(reply: Reply) {
    this.reply = reply;
    this.replyService.setReplyUser(reply);
    this.replyCommentService.getReplyComments(reply.id)
    .subscribe(replyComments => this.replyComments = replyComments);
  }
}