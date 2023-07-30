## Description
API that handles orders from one or more restaurants.
## Installation
1. Create a file in the root of the project called .env.
2. Copy the content of .env.example to the .env file.
3. Modify the values according to the options of the environment where the application will run.
4. Install the necessary dependencies by running the command:
    ```bash
    $ npm install
    ```
    or

    ```bash
    $ yarn
    ```
5. Install Docker (optional if you already have MongoDB and Redis installed).
6. Run the following command (required in case of using Docker):
    ```bash
    $ yarn database:up
    ```
7. To run the application run the following command:
    ```bash
    $ yarn start:dev
    ```

## Swagger documentation

http://localhost:${PORT}/docs

## Test
1. Installation passes completed.
2. Update the values defined in .env.example to the correct values for your environment.
3. Run the command:

    ```bash
    $ yarn test:e2e
    ```

## Stay in touch

- Author - [Jose Manuel Fernandez Carbo](https://github.com/josemcarbo)

