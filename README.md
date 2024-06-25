# Issue Tracker

This project is a full-stack JavaScript application for tracking issues. It is functionally similar to the [Issue Tracker](https://issue-tracker.freecodecamp.rocks/) by freeCodeCamp. The project includes routes for creating, viewing, updating, and deleting issues, and has been tested to ensure full functionality.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/freeCodeCamp/boilerplate-project-issuetracker.git
    cd boilerplate-project-issuetracker
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Copy the sample environment variables file and set the variables appropriately:
    ```bash
    cp sample.env .env
    # Edit the .env file with appropriate values
    ```

### Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. To run the tests automatically, add `NODE_ENV=test` in your `.env` file.

3. To run the tests in the console:
    ```bash
    npm run test
    ```

### Project Structure

- `server.js`: Entry point of the application.
- `/routes/api.js`: Contains all the necessary routes.
- `/models/issue.js`: Mongoose schema and model for issues.
- `/tests/2_functional-tests.js`: Functional tests.

### Routes

- **Create an issue** (with every field):
    - POST `/api/issues/{project}`
- **Create an issue** (with only required fields):
    - POST `/api/issues/{project}`
- **Create an issue** (with missing required fields):
    - POST `/api/issues/{project}`
- **View issues** on a project:
    - GET `/api/issues/{project}`
- **View issues** on a project with one filter:
    - GET `/api/issues/{project}`
- **View issues** on a project with multiple filters:
    - GET `/api/issues/{project}`
- **Update one field** on an issue:
    - PUT `/api/issues/{project}`
- **Update multiple fields** on an issue:
    - PUT `/api/issues/{project}`
- **Update an issue** with missing `_id`:
    - PUT `/api/issues/{project}`
- **Update an issue** with no fields to update:
    - PUT `/api/issues/{project}`
- **Update an issue** with an invalid `_id`:
    - PUT `/api/issues/{project}`
- **Delete an issue**:
    - DELETE `/api/issues/{project}`
- **Delete an issue** with an invalid `_id`:
    - DELETE `/api/issues/{project}`
- **Delete an issue** with missing `_id`:
    - DELETE `/api/issues/{project}`

### Functional Tests

The following tests are implemented in `tests/2_functional-tests.js`:

1. Create an issue with every field
2. Create an issue with only required fields
3. Create an issue with missing required fields
4. View issues on a project
5. View issues on a project with one filter
6. View issues on a project with multiple filters
7. Update one field on an issue
8. Update multiple fields on an issue
9. Update an issue with missing `_id`
10. Update an issue with no fields to update
11. Update an issue with an invalid `_id`
12. Delete an issue
13. Delete an issue with an invalid `_id`
14. Delete an issue with missing `_id`

### Enhancements and Design

The application has been enhanced with a beautiful design to provide a better user experience. The user interface is intuitive and easy to navigate, ensuring users can manage issues efficiently.

### License

This project is licensed under the MIT License.
