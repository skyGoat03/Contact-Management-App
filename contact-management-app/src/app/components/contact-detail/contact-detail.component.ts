import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  loading = false;
  contactId: string | null = null;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      if (this.contactId) {
        this.loadContact();
      }
    });
  }

  loadContact(): void {
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContactById(this.contactId).subscribe({
        next: (contact) => {
          this.contact = contact;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Failed to load contact', 'Close', { duration: 3000 });
          console.error('Error loading contact:', error);
          this.router.navigate(['/dashboard/contacts']);
        }
      });
    }
  }

  editContact(): void {
    if (this.contactId) {
      this.router.navigate(['/dashboard/contacts', this.contactId, 'edit']);
    }
  }

  deleteContact(): void {
    if (!this.contact) return;

    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Contact',
        message: `Are you sure you want to delete ${this.contact.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.contactId) {
        this.contactService.deleteContact(this.contactId).subscribe({
          next: () => {
            this.snackBar.open('Contact deleted successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard/contacts']);
          },
          error: (error) => {
            this.snackBar.open('Failed to delete contact', 'Close', { duration: 3000 });
            console.error('Error deleting contact:', error);
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/contacts']);
  }
}
