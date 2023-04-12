# ElitePay

This is the readme for the ElitePay. A platform for creating new debit cards and sending/receiving transactions with other users and the ability to accept a transaction. Users can also talk in real-time through a chat room utilizing webs sockets. Enjoy the next generation payment experience!

## Live Server Link
https://elitepay.onrender.com/

## Wiki Link
* [API Documentation](https://github.com/jeffliu007/ElitePay/wiki/API-Docs)
* [Database Schema](https://github.com/jeffliu007/ElitePay/wiki/DB-Schemaa)
* [Feature List](https://github.com/jeffliu007/ElitePay/wiki/MVP-Feature-List)
* [User Stories](https://github.com/jeffliu007/ElitePay/wiki/User-Stories)
* [Wireframe](https://github.com/jeffliu007/ElitePay/wiki/Wireframe)

## Tech Stack
* Frameworks, Platforms, and Libraries: 
  * Javascript
  * Python
  * HTML5
  * CSS3
  * Node.js
  * React
  * Redux
  * Flask
  * SQLAlchemy
  * Alembic
* Database
  * Postgres
* Hosting
  * Render
  
  
 ## Preview
  
  ![EPay2](https://user-images.githubusercontent.com/98433650/226741558-c1ae2682-0483-4ec7-819d-1fc93b2b0ea2.gif)

  
  ![EPay1](https://user-images.githubusercontent.com/98433650/226741572-194d1af2-6abe-4a1f-8b69-75861c8d4b7e.gif)

  
## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   - Example
   
   ```js
   SECRET_KEY=super-secret-key
   FLASK_ENV=development
   FLASK_DEBUG=True
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=elitepay_schema
   FLASK_RUN_PORT=5001
   ```

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
