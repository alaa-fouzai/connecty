import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ConfigService } from '@services/config.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss'],
})
export class AdminConfigComponent {
    public user : any ={};
    AddNewChatBot : FormGroup;
    public property : any = [{}];
    public chat : any = [{}];
    public integrationId:string;
  closeResult: string;
  propertyselected:string;
  chatBotName:string;
    constructor(private modalService: NgbModal,private appService: AppService,private router:Router,private config:ConfigService,private toastr: ToastrService) {
      this.appService.getUser().subscribe(data => this.user = data);
      this.property = [{}]
      this.config.getProperty().subscribe(data => this.property = data);
      this.config.getChat().subscribe(data => {
        this.chat = data; 
        console.log(data)});
    }
        
    async ngOnInit() {
      if ( ! this.user.hasOwnProperty("Role") ||  ! this.user.Role.includes("admin") ) {
          this.router.navigate(['/'])
      }
  }
  ngOnDestroy() {
    
 }

  addNew(){
    console.log("aadd new");
    Swal.fire({
      title: 'Add New Property',
      html:`<input type="text" id="name" class="swal2-input" placeholder="Name">
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // @ts-ignore: Unreachable code error
        const login = Swal.getPopup().querySelector('#name').value
        console.log(login)
        if (!login) {
          Swal.showValidationMessage(`Please fill the information`)
        }else {
          console.log(login)
          let res = this.config.setProperty(login);
          console.log(res);
          return { login: login }
        }
        
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Chatbot Created`
        })
      }
    })
  }
  submitAddNewChatBot(){}
  getproperty(){
    console.log(this.property);
  }
  async flipState(id,state){
    console.log(!state);
    await this.config.changePropertyState(id,!state).subscribe(res => {
      console.log(res.status);
      this.toastr.success(res.message);
      this.config.getProperty().subscribe(data => this.property = data);
    });

  }
  flipchatState(id,state){

  }
  Integration(id){
    this.config.integrationId = id;
    this.router.navigate(["/integration"])
    
  }
  addNewChatBot() {
    console.log("add new chatbot");
    
  }
  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log("result: ", this.propertyselected);
				console.log("chatBotName: ", this.chatBotName);
        if (this.propertyselected && this.chatBotName) {
          this.config.CreateNewChat(this.propertyselected,this.chatBotName).subscribe(data => {
          this.toastr.success(data.message);
          console.log(data.message);
          this.config.getProperty().subscribe(data => this.property = data);
          this.config.getChat().subscribe(data => {this.chat = data; console.log(data)});
        });
        }else {
          this.toastr.error('Please Fill out the form');
        }
			},
			(reason) => {
				console.log("My input: ", this.propertyselected);
			},
		);
	}
}
