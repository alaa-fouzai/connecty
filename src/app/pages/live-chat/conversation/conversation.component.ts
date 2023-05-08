import { Component } from '@angular/core';
import { AppService } from '@services/app.service';
import { ConversationService } from './conversation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  public user : any ={};
  public chatbot : any ={};
  public conversations : any ={};
  constructor(private toastr: ToastrService,private conv:ConversationService, private appService: AppService,private router:Router) {
    this.appService.getUser().subscribe(data => this.user = data);
    this.conv.getChatfromDB();
    this.conv.getConversationsfromDB();
    this.conv.getMessage().subscribe(data=>{
      console.log(data)
      /*{
    "message": "azeaze",
    "email": "alaa@alaa.com",
    "name": "alaa"
}*/
    });
    this.conv.chatBot.subscribe(data => {
      this.chatbot = data;
      console.log(data);
    });
    this.conv.conversations.subscribe(data => {
      this.conversations = data;
    });
  }
  ngOnInit() {
  }
  messageViewed(conversationId) {
    console.log(conversationId);
    //change seen on all messages to true
  }
  sendAdminMessage(id) {
    let message=(<HTMLInputElement>document.getElementById('AdminMessage'+id)).value;
    console.log(this.user);
    if (message) {
      this.conv.SentAdminMessageToDb(id,message,this.user);
    } else {
      this.toastr.error('Please add a message', 'No Message');
    }
    
  }
}
