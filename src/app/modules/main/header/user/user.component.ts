import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private appService: AppService,) {
        this.appService.getUser().subscribe(data => this.user = data);
    }

    async ngOnInit(): Promise<void> {
        //this.user = this.appService.getUser();
    }
    ch() {
        console.log(this.user);
    }
    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
