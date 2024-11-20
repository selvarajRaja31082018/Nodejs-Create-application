import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-ui-color',
  standalone: true,
  //imports: [SharedModule],
  //standalone: true,
  //imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  users: any[] = [];
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.authService.getAllUsers().subscribe(
      response => {
        this.users = response;  // Assuming the API returns an array of users
        console.log('User list fetched successfully', this.users);
      },
      error => {
        this.errorMessage = error.error?.message || 'Failed to fetch user list';
        console.error('Error fetching user list', error);
      }
    );
  }
}
