# Contact Management App

A complete Angular application for managing contacts with authentication, CRUD operations, and a beautiful Material Design interface.

## Features

- 🔐 **Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Protected routes with guards

- 📱 **Contact Management**
  - View all contacts in a responsive table
  - Add new contacts with form validation
  - Edit existing contact information
  - Delete contacts with confirmation dialog
  - View detailed contact information

- 🎨 **Modern UI/UX**
  - Material Design components
  - Responsive layout
  - Beautiful gradients and animations
  - Intuitive navigation with sidebar

## Technology Stack

- **Frontend**: Angular 17 (Standalone Components)
- **UI Framework**: Angular Material
- **Styling**: SCSS with Material Design theme
- **State Management**: RxJS with BehaviorSubject
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router with lazy loading

## API Integration

The application integrates with the following API endpoints:

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User authentication
- `GET /api/contacts/` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts/` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contact-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## Usage

### Getting Started

1. **Register a new account**
   - Navigate to the registration page
   - Fill in your username, email, and password
   - Click "Register" to create your account

2. **Login to your account**
   - Use your registered credentials
   - Click "Login" to access the dashboard

3. **Manage your contacts**
   - View all contacts in the dashboard
   - Add new contacts using the "Add Contact" button
   - Edit or delete existing contacts
   - View detailed contact information

### Features Walkthrough

#### Dashboard
- Welcome screen with quick access to contacts
- Sidebar navigation for easy access to features
- User profile menu with logout option

#### Contact List
- Responsive table showing all contacts
- Action buttons for view, edit, and delete operations
- Empty state with call-to-action when no contacts exist

#### Contact Form
- Reusable form for creating and editing contacts
- Form validation with error messages
- Responsive design with Material Design inputs

#### Contact Detail
- Detailed view of contact information
- Edit and delete actions
- Back navigation to contact list

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/                 # Login component
│   │   ├── register/              # Registration component
│   │   ├── dashboard/             # Main dashboard
│   │   ├── contact-list/          # Contact list view
│   │   ├── contact-form/          # Add/edit contact form
│   │   └── contact-detail/        # Contact detail view
│   ├── models/
│   │   ├── user.model.ts          # User interfaces
│   │   └── contact.model.ts       # Contact interfaces
│   ├── services/
│   │   ├── auth.service.ts        # Authentication service
│   │   └── contact.service.ts     # Contact CRUD service
│   ├── guards/
│   │   └── auth.guard.ts          # Route protection
│   ├── shared/
│   │   └── mat-confirm-dialog/    # Reusable confirm dialog
│   ├── app.component.ts           # Root component
│   ├── app.config.ts              # App configuration
│   └── app.routes.ts              # Application routes
├── styles.scss                    # Global styles
└── index.html                     # Main HTML file
```

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run linting

### Code Style

The project follows Angular best practices:
- Standalone components for better tree-shaking
- Reactive forms with validation
- TypeScript interfaces for type safety
- Material Design components for consistent UI
- SCSS for styling with BEM methodology

## API Configuration

The application is configured to work with the provided API endpoints. The base URL is set in the services:

```typescript
private readonly API_URL = 'https://f626c796-87d3-48fd-b89f-155003dcc8b2.mock.pstmn.io/api';
```

## Security Features

- JWT token storage in localStorage
- Route guards for protected pages
- Automatic token inclusion in API requests
- Form validation and sanitization

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the API server is running and accessible
   - Check if the API URL is correct in the services

2. **Authentication Issues**
   - Clear browser localStorage
   - Check if the API token endpoint is working

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
