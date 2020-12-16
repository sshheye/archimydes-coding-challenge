

# User Story Frontend

An application that has the option of creating a User Story (i.e ticket or card). The App contains information about what kind of task needs to be performed. The Admin will review the User Story and make changes if required. The Admin will also be able to approve or reject the User story created by the user.

# Assumptions

- The app depends on API server https://github.com/sshheye/user-stories-api
- Token expiration is set to 3600 seconds after the iat of the JWT. The expiration time can be adjusted in the
  `src/environments/environment.ts` and `src/environments/environment.prod.ts` file.
  
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

