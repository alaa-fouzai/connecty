import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {
  public id:string;
  constructor(private router:Router,private config:ConfigService,private toastr: ToastrService) {
  this.id =this.config.integrationId;
  }
}
