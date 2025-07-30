import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';
import { Contact, CreateContactRequest, UpdateContactRequest } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  isEditMode = false;
  contactId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.contactId = params['id'];
        this.isEditMode = true;
        this.loadContact();
      }
    });
  }

  loadContact(): void {
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContactById(this.contactId).subscribe({
        next: (contact) => {
          this.contactForm.patchValue({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
          });
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

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      
      if (this.isEditMode && this.contactId) {
        const updateRequest: UpdateContactRequest = this.contactForm.value;
        this.contactService.updateContact(this.contactId, updateRequest).subscribe({
          next: () => {
            this.snackBar.open('Contact updated successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard/contacts']);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open('Failed to update contact', 'Close', { duration: 3000 });
            console.error('Error updating contact:', error);
          }
        });
      } else {
        const createRequest: CreateContactRequest = this.contactForm.value;
        this.contactService.createContact(createRequest).subscribe({
          next: () => {
            this.snackBar.open('Contact created successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard/contacts']);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open('Failed to create contact', 'Close', { duration: 3000 });
            console.error('Error creating contact:', error);
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/contacts']);
  }
}
