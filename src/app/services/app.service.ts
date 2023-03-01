import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { resolve } from 'path';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Gatekeeper } from 'gatekeeper-client-sdk';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any={};
    private users =new BehaviorSubject<Object>({});
    constructor(private router: Router, private toastr: ToastrService,private http: HttpClient) {}

    async loginByAuth({email, password}) {
        try {
            let token;
            const resp = await this.http.post(environment.LoginURL,{
                email : email,
                password : password,
              }).subscribe(async data => {
                if (data['status']=="ok") {
                token = data['token']
                console.log(token);
                localStorage.setItem('token',token);
                await this.getProfile();
                this.router.navigate(['/']);
                this.toastr.success('Welcome Back');
            } else {
                this.toastr.success(data['message']); 
            }
            });
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password,FirstName,LastName}) {
        try {
            let token;
            const resp = await this.http.post(environment.RegisterURL,{
                FirstName: FirstName ,
                LastName: LastName,
                email : email,
                password : password,
                enabled : 1
              }).subscribe(async data => {
                
                token = data['token']
                console.log(token);
                localStorage.setItem('token',token);
                await this.getProfile();
                this.router.navigate(['/']);
                this.toastr.success('Register success');
            });
            
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            //const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', "token");
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            //const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', "token");
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            //const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', "");
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            //const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', "token");
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        await this.http.post<any>(environment.GetUserURL,{
                token: localStorage.getItem('token')
              }).subscribe(data => {
                console.log(data)
                this.users.next(data);
              })       
    }
    getUser(): Observable<object> {
        this.getProfile();
          return this.users;
    }
    setUser(){
        this.http.post<any>(environment.GetUserURL,{
            token: localStorage.getItem('token')
          }).subscribe(data => {});
    }
    logout() {
        localStorage.removeItem('token');
        //localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
