import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../../../auth/auth.service';
import { User } from './user.model'; // Adjust the path accordingly
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, NgxPaginationModule], // Include NgxPaginationModule here
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'] 
})
export class UserComponent implements OnInit {

  user: User[] = []; // Use the User model
  errorMessage: string;

  itemsPerPage: number = 5; // Items per page
  currentPage: number = 1; // Current page
  totalItems: number = 0; // Total number of items

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPage(this.currentPage); // Load the first page on init
  }

  // Fetch users for the current page
  loadPage(page: number): void {
    this.authService.getAllUsers(page, this.itemsPerPage).subscribe(
      response => {
        this.user = response.data; // Assuming 'data' contains the list of users
        this.totalItems = response.totalCount; // Assuming 'totalCount' contains the total number of users
        
        console.log('User list fetched successfully', this.user);
      },
      error => {
        this.errorMessage = error.error?.message || 'Failed to fetch user list';
        console.error('Error fetching user list', error);
      }
    );
  }

  // Handle page change event
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPage(page); // Load the selected page
  }
}
