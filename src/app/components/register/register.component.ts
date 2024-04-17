import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  editForm: FormGroup;
  registerform: FormGroup;
  showRegister: boolean = false;

  constructor(private authService: AuthService) {
    this.editForm = new FormGroup({
      firstname: new FormControl("", ),
      lastname: new FormControl("", ),
      email: new FormControl("", ),
      mobile: new FormControl("", ),
      gender: new FormControl("", ),
      pwd: new FormControl("", )
    });

    this.registerform = new FormGroup({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [Validators.required, Validators.pattern('[0-9]{10}')]),
      gender: new FormControl("", Validators.required),
      pwd: new FormControl("",Validators.required ),
      rpwd: new FormControl("",)
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  registerSubmitted() {
    const formData = this.registerform.value;
    if (formData) {
      const user: User = {
        
        firstname: formData.firstname?.toString(),
        lastname: formData.lastname?.toString(),
        email: formData.email?.toString(),
        mobile: formData.mobile?.toString(),
        gender: formData.gender?.toString(),
        pwd: formData.pwd?.toString()
      };
      this.authService.registerUser(user)
        .subscribe(
          res => {
            console.log("Registration successful:", res);
            this.registerform.reset();
            this.getAllUsers();
          },
          error => {
            console.error("Registration error:", error);
          }
        );
    } else {
      console.error("Form data is not available.");
    }
  }

  getAllUsers() {
    this.authService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      }, error => {
        console.error("Error getting users:", error);
      });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editForm.patchValue(user);
  }

  updateUser() {
    if (this.editingUser && this.editingUser.id) {
      const userId = +this.editingUser.id;
      const updatedUserData = this.editForm.value;
      this.authService.updateUser(userId, updatedUserData)
        .subscribe(
          res => {
            console.log("Update successful:", res);
            this.getAllUsers();
            this.cancelEdit();
          },
          error => {
            console.error("Update error:", error);
          }
        );
    }
  }

  deleteUser(obj:User){
    console.log("User id: ",obj.id);
    this.authService.deleteUser(obj)
      .subscribe(
        res => {
          console.log("Delete success:", res);
          this.getAllUsers();
        },
        error => {
          console.error("Delete error:", error);
        }
      );
  }

  cancelEdit() {
    this.editingUser = null;
    this.editForm.reset();
  }

  showRegisterForm() {
    this.showRegister = true;
  }

  cancelRegister() {
    this.showRegister = false;
    this.registerform.reset();
  }
}
