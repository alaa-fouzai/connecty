import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { ToastrService } from 'ngx-toastr';
import {Clipboard} from '@angular/cdk/clipboard';


@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {
  public id:string;
  script: string;
  constructor(private clipboard: Clipboard,private router:Router,private config:ConfigService,private toastr: ToastrService) {
  this.id =this.config.integrationId;
  }
  async ngOnInit() {
this.script=
' <script>\n'+
'    function addConnectyScript(id) {\n'+
'    var script=document.createElement("script");\n'+
'    script.setAttribute("type","text/javascript");\n'+
'    script.setAttribute("src","chatScript.js");\n'+
'    script.setAttribute("id","connectyChatScript");\n'+
'    script.setAttribute("chat",id);\n'+
'    document.getElementsByTagName("head")[0].appendChild(script);\n'+
'    }\n'+
'    addConnectyScript("'+this.id+'");\n'+
' </script>';
  }
  copyInputMessage(){
    console.log(this.script)
    this.clipboard.copy(this.script);
  }
}
