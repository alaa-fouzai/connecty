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
  private Property =new BehaviorSubject<Object>([{}]);

  constructor(private router: Router, private toastr: ToastrService,private http: HttpClient) { }
  
  async setProperty(PropertyName){
    await this.http.post<any>(environment.NewProperty,{
      token: localStorage.getItem('token'),
      PropertyName: PropertyName,
      }).subscribe(data => {
        console.log(data);
        this.getPropertyfromDB();
      });
  }
  
  async getChatBotsfromDB() {
    await this.http.post<any>(environment.GetUserURL,{
            token: localStorage.getItem('token')
          }).subscribe(data => {
            this.chatBots.next(data);
          })       
}
async getPropertyfromDB() {
  await this.http.get<any>(environment.getAllProperty, {
    params: {
      token: localStorage.getItem('token')
    }
  }
  ).subscribe(data => {
    this.Property.next(data.propertys);
  })       
}
getChatBots(): Observable<object> {
    this.getChatBotsfromDB();
      return this.chatBots;
}
getProperty(): Observable<object> {
  this.getPropertyfromDB();
    return this.Property;
}
changePropertyState(id: any,state:any) {
  return this.http.post<any>(environment.changePropertyState,{
    token: localStorage.getItem('token'),
    id:id
  }) 
}
CreateNewChat(propertyId,chatBotName) {
  return this.http.post<any>(environment.CreateNewChat,{
    token: localStorage.getItem('token'),
    propertyId:propertyId,
    chatBotName:chatBotName
  }) 
}
}
