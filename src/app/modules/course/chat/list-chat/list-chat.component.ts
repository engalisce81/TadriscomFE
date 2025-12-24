import { CoreModule, ConfigStateService } from '@abp/ng.core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms'; // مهم عشان الـ ngModel
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '@proxy/dev/acadmy/chats';
import { CreateUpdateChatMessageDto } from '@proxy/dev/acadmy/dtos/request/chats';
import { ChatMessageDto } from '@proxy/dev/acadmy/dtos/response/chats';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-chat',
  standalone: true, // لو بتستخدم Standalone Components
  imports: [CoreModule, CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './list-chat.component.html',
  styleUrl: './list-chat.component.scss'
})
export class ListChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: ChatMessageDto[] = [];
  newMessage: string = '';
  receiverId: string = '';
  currentUserId: string = '';
  loading = false;
  sending = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private configState: ConfigStateService // عشان نجيب بيانات المستخدم الحالي
  ) {
    // جلب الـ ID الخاص بك من الـ Store بتاع ABP
    this.currentUserId = this.configState.getOne("currentUser").id;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.receiverId = params['id']; 
      this.loadMessages();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadMessages() {
    this.loading = true;
    this.chatService.getMessages(this.receiverId, 1, 100)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.messages = res.items || [];
      });
  }

  send() {
    if (!this.newMessage.trim() || this.sending) return;

    const input: CreateUpdateChatMessageDto = {
      receverId: this.receiverId,
      message: this.newMessage
    };

    this.sending = true;
    this.chatService.sendMessage(input)
      .pipe(finalize(() => this.sending = false))
      .subscribe(msg => {
        // بنضيف الرسالة فوراً في الـ Array عشان تظهر للمستخدم
        this.messages.push(msg);
        this.newMessage = '';
        this.scrollToBottom();
      });
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}