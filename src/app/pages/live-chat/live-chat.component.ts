import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ConfigService } from '@services/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent {
  public user : any ={};
  public chat : any = [{}];
  constructor(private appService: AppService,private router:Router,private config:ConfigService,private toastr: ToastrService) {
    this.appService.getUser().subscribe(data => this.user = data);
    this.config.getChat().subscribe((data : any) => {
      this.chat = data.Chat;
      this.user = data.user;
      console.log(data)
    });
    this.getStatistics()  
  }
  ngOnInit() {
  }
  test() {
    console.log(this.chat)
    console.log(this.user)
  }
  conversation(id,state){
    console.log(id);
    console.log(state);
    
  }
  getStatistics() {
  }
}