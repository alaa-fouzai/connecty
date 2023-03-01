import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss']
})
export class AdminConfigComponent {
    public user : any ={};
    AddNewChatBot : FormGroup;
    constructor(private appService: AppService,private router:Router) {
      this.appService.getUser().subscribe(data => this.user = data);
    }
        
    async ngOnInit() {
      if ( ! this.user.hasOwnProperty("Role") ||  ! this.user.Role.includes("admin") ) {
          this.router.navigate(['/'])
      }
  }

  addNew(){
    console.log("aadd new");
    Swal.fire({
      title: 'Add New Chatbot',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        console.log(login);
        
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Chatbot Created`
        })
      }
    })
  }
  submitAddNewChatBot(){}
}
