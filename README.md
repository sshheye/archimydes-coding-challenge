# Assumptions

- The app depends on API server https://github.com/Archimydes/coding-challenge-mock-api
- Token expiration is set to 3600 seconds after the iat of the JWT. The expiration time can be adjusted in the
  `src/environments/environment.ts` and `src/environments/environment.prod.ts` file.

- Edit feature for stories is currently not feasible since the 'put' endpoint(/v1/stories/{id}/{status}) requires a status and a normal user(story author) doesn't have permissions to set status.

- Story types are currently hard-coded in the frontend since there isn't an endpoint for that, a common solution is to provide a get endpoint for story types and then cache the story type on the frontend since they'll seldom change.

- Story status 'Pending' is used to represent null status instead of show blank fields.

- When signing in, there's a toggle that switches between admin and user signing in, this serves the same purpose of having two buttons for admin and normal user login and the assumption is that its easier to comprehend and use.

# User Story Frontend

An application that has the option of creating a User Story (i.e ticket or card). The App contains information about what kind of task needs to be performed. The Admin will review the User Story and make changes if required. The Admin will also be able to approve or reject the User story created by the user.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
