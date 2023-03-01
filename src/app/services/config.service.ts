import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private chatBots =new BehaviorSubject<Object>({});
  private Property =new BehaviorSubject<Object>({});
  constructor(private router: Router, private toastr: ToastrService,private http: HttpClient) { }
  
  
  
  async getChatBotsfromDB() {
    await this.http.post<any>(environment.GetUserURL,{
            token: localStorage.getItem('token')
          }).subscribe(data => {
            console.log(data)
            this.chatBots.next(data);
          })       
}
async getPropertyfromDB() {
  await this.http.post<any>(environment.GetUserURL,{
          token: localStorage.getItem('token')
        }).subscribe(data => {
          console.log(data)
          this.chatBots.next(data);
        })       
}
getChatBots(): Observable<object> {
    this.getChatBotsfromDB();
      return this.chatBots;
}
getProperty(): Observable<object> {
  this.getChatBotsfromDB();
    return this.Property;
}

}
