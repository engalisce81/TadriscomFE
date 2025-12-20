import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateChatMessageDto } from '../dtos/request/chats/models';
import type { ChatMessageDto } from '../dtos/response/chats/models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiName = 'Default';
  

  getMessages = (receverId: string, pageNumber: number = 1, pageSize: number = 10, search?: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChatMessageDto>>({
      method: 'GET',
      url: `/api/app/chat/messages/${receverId}`,
      params: { pageNumber, pageSize, search },
    },
    { apiName: this.apiName,...config });
  

  sendMessage = (input: CreateUpdateChatMessageDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/chat/send-message',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
