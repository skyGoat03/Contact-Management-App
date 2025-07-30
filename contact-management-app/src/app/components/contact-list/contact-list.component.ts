import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  loading = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Failed to load contacts', 'Close', { duration: 3000 });
        console.error('Error loading contacts:', error);
      }
    });
  }

  viewContact(contact: Contact): void {
    this.router.navigate(['/dashboard/contacts', contact._id]);
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/dashboard/contacts', contact._id, 'edit']);
  }

  deleteContact(contact: Contact): void {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Contact',
        message: `Are you sure you want to delete ${contact.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.deleteContact(contact._id!).subscribe({
          next: () => {
            this.snackBar.open('Contact deleted successfully', 'Close', { duration: 3000 });
            this.loadContacts();
          },
          error: (error) => {
            this.snackBar.open('Failed to delete contact', 'Close', { duration: 3000 });
            console.error('Error deleting contact:', error);
          }
        });
      }
    });
  }

  addNewContact(): void {
    this.router.navigate(['/dashboard/contacts/add']);
  }
}
