import { Component, ElementRef, ViewChild } from '@angular/core';
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
  public displayedConversations : any ={};
  constructor(private toastr: ToastrService,private conv:ConversationService, private appService: AppService,private router:Router) {
    this.appService.getUser().subscribe(data => this.user = data);
    this.conv.getChatfromDB();
    this.conv.getConversationsfromDB();
    this.conv.chatBot.subscribe(data => {
      this.chatbot = data;
    });
    this.conv.conversations.subscribe(data => {
      this.conversations = data;
      this.displayedConversations = this.conversations;
    });
    this.conv.getMessage().subscribe((data:any)=>{

      var found = false;
      for(var i = 0; i < this.conversations.length; i++) {
          if (this.conversations[i]._id == data._id) {
              found = true;
              this.conversations[i].texts=data.texts;
              this.OpenConversation(data._id);
              break;
          }
      }
      if (found === false) {
      this.conversations.push(data);
      this.OpenConversation(data._id);
      }
      this.delay(500).then(() => document.getElementById(document.getElementById("chatmessages").lastElementChild.lastElementChild.lastElementChild.id).scrollIntoView({ behavior: 'smooth', block: 'start' }));
      
    });

  }
  ngOnInit() {
    
  }
  ngAfterViewInit(): void {
  }
  messageViewed(conversationId) {
    console.log(conversationId);
    //change seen on all messages to true
  }
  sendAdminMessage(id) {
    let message=(<HTMLInputElement>document.getElementById('AdminMessage'+id)).value;
    if (message) {
      this.conv.SentAdminMessageToDb(id,message,this.user).then((data) => {
        let conv = this.displayedConversations.find(conv => conv._id === id)
        console.log(conv);
        let i = this.displayedConversations.indexOf(conv);
        console.log(typeof(this.displayedConversations[i].texts));
        console.log(this.displayedConversations[i].texts);
        <Array<object>>this.displayedConversations[i].texts.push(
          {"_id": "" + Math.floor(Date.now() / 1000),
          "message":message,
           "email" :this.user.email,
           "name": this.user.FirstName +" "+this.user.LastName,
           "owner": "Admin",
           "seen": false,
           "timestamp": Math.floor(Date.now() / 1000)
          });
        (<HTMLInputElement>document.getElementById('AdminMessage'+id)).value = "";
        this.delay(500).then(() => document.getElementById(document.getElementById("chatmessages").lastElementChild.lastElementChild.lastElementChild.id).scrollIntoView({ behavior: 'smooth', block: 'start' }));
      });
    } else {
      this.toastr.error('Please add a message', 'No Message');
    }
    
  }
  closeConversation(id){
    console.log(id)
    this.conv.CloseConversation(id);
    this.displayedConversations = this.displayedConversations.filter(item => item._id !== id);
    let element = this.conversations.findIndex(x => x._id === id);
    
    this.conversations[element].state = false;
    document.getElementById(id).classList.remove("chatactive");
    document.getElementById(id).classList.add("chatnotactive");
  }
  OpenConversation(id){
    this.conv.OpenConversation(id);
    let element = this.conversations.findIndex( x => x._id === id);
    this.conversations[element].state = true;
    if(this.displayedConversations.findIndex( x => x._id === id) < 0) {
    this.displayedConversations.push(this.conversations[element]);
    }
    this.delay(500).then(() => document.getElementById(document.getElementById("chatmessages").lastElementChild.lastElementChild.lastElementChild.id).scrollIntoView({ behavior: 'smooth', block: 'start' }));
      
  }
  async getConversationById(id) {
    let element1 = this.conversations.findIndex( x => x._id === id);
    this.conversations[element1].state = true;
    let element = this.displayedConversations.findIndex( x => x._id === id);
    if(element < 0) {
    //not exist in list
    (await this.conv.getConversationById(id)).subscribe(c => {
      console.log(c.Conversation)
      this.displayedConversations.push(c.Conversation);
      this.toastr.success('success', "Conversation Opened");
      
    })
    } else {
      this.toastr.success('success', "Conversation Already Opened");
    }
    document.getElementById(id).classList.remove("chatnotactive");
    document.getElementById(id).classList.add("chatactive");
    this.delay(500).then(() => document.getElementById(document.getElementById("chatmessages").lastElementChild.lastElementChild.lastElementChild.id).scrollIntoView({ behavior: 'smooth', block: 'start' }));
      
  }
  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
