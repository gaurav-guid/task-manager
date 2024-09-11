# This is a tasks manager application

This application allows users to create, read, update, and delete tasks.

## Folder Structure

### **infra**

This contains infrastructure related code, e.g. docker files.

### **back-end**

This contains backend this application, which is written using Express.js

### **front-end**

This contains frontend this application, which is written using React

---

# Setting up mongodb with docker for local development:

- Run the command `sudo docker compose -f .\infra\mongo.yml up` in the root folder.
- This will spin up 2 docker containers, one for mongodb and one for mongo-express.
- It will also create a network (for the mongo-express container to talk to mongodb container).
- and a volume (for persisting db data).
- The mongo express is configured to talk to mongodb container over the docker network.
- The mongo-express can be accessed at `http://localhost:8081/` and the following credentials will allow to login:
  > - username: admin
  > - password: password

# Initializing database:

- Ensure that a database named task-manager is created (can create using mongo express)
- run the command `npm rum initialize-db` in `back-end` folder

# Running the backend express app:

- cd to `~/task-manager/back-end` and run `npm run start`

# DEBT: Add readme content for frontend
