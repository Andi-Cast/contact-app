# Contact Management Frontend

This is the frontend for the Contact Management application, built with React, Vite, and Tailwind CSS. It provides a user-friendly interface for managing contact details, including adding, updating, and deleting contacts, as well as handling profile photos.

## Features

- **Contact Details**: View and update detailed information for individual contacts.
- **Add New Contact**: Open a modal to add a new contact with a profile photo.
- **Profile Photo Management**: Upload and update profile photos for contacts.
- **Toast Notifications**: Display success, error, and informational messages.

## Technology Used

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

## Example Images
- Main Page
    - This page displays lists all the contacts from the database while having an option to add new contact.
    - <img src="" height="auto" width="75%">
- Edit Contact Page
    - This page is accessed but clicking on the individual contact cards and allows the user to update the contact. 
    - <img src="" height="auto" width="75%">

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the frontend directory:
    ```bash
    cd contact-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and go to `http://localhost:5173` to view the application.

## Components

- **`Header`**: Displays the header with the total number of contacts and a button to open the modal for adding a new contact.
- **`ContactList`**: Shows a grid of contacts with pagination controls.
- **`Contact`**: Represents an individual contact card in the list.
- **`ContactDetail`**: Displays detailed information for a single contact and allows for updates.
- **`App`**: Manages state, fetches contacts, and controls the modal for adding new contacts.
- **`ToastyService`**: Provides toast notifications for various events and errors.

## API Integration

- **GET /contacts**: Fetches the list of contacts with pagination.
- **POST /contacts**: Saves a new contact or updates an existing contact.
- **PUT /contacts/photo**: Updates the profile photo of a contact.
- **GET /contacts/{id}**: Fetches details of a specific contact.
- **DELETE /contacts/{id}**: Deletes a contact.

## Modal Usage

The application uses an HTML `<dialog>` element for modals to handle adding new contacts and uploading profile photos. This modal is managed using React refs.

## Error Handling

The application uses React Toastify to display error messages and other notifications. Ensure you handle any exceptions that occur during API interactions to provide a smooth user experience.



