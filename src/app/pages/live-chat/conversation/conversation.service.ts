import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  public chatBot =new BehaviorSubject<Object>({});
  public conversations =new BehaviorSubject<Object>([{}]);
  private ChatBotId;
  constructor(private router: Router,private socket: Socket, private toastr: ToastrService,private http: HttpClient) { }
  setChatBotId(botId) {
    this.ChatBotId = botId;
  }
  getChatBotId() {
    return this.ChatBotId;
  }
  //get chat
  async getChatfromDB() {
    if (this.ChatBotId) {
    await this.http.get<any>(environment.GetSingleChat,{
      params: {
            token: localStorage.getItem('token'),
            ChatBotId: this.ChatBotId
          }
          }).subscribe(data => {
            this.chatBot.next(data.Chat);
          })       
        } else {
          this.toastr.error('error', 'could net get data from DB');
          console.log("no chatbot Id");
          this.router.navigate(["/LiveChat"])
        }
}
// get all conversations
async getConversationsfromDB() {
  if (this.ChatBotId) {
    console.log(this.ChatBotId);
  await this.http.get<any>(environment.GetConversations,{
    params: {
          token: localStorage.getItem('token'),
          ChatBotId: this.ChatBotId
        }
        }).subscribe(data => {
          this.conversations.next(data.Conversation);
          console.log(data.Conversation);
        })       
      } else {
        this.toastr.error('error', 'could net get conversations from DB');
        console.log("no chatbot Id");
      }
}
async SentAdminMessageToDb(ConversationId,Message,user) {
  //send via socket
  this.socket.emit('AdminEmit', {
    token: localStorage.getItem('token'),
    Message: Message,
    ConversationId:ConversationId,
    email:user.email,
    LastName:user.LastName,
    FirstName:user.FirstName
  });
  }
getMessage() {
  this.socket.emit('create', this.ChatBotId);
  return this.socket.fromEvent('clientMessage');
}
}