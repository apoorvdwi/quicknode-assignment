# Quicknode Assignment

## Local Development

- Clone the GitHub Repo

  ```sh
  git clone https://github.com/apoorvdwi/quicknode-assignment.git
  ```

- Cd into the cloned repo and install dependancies

  ```sh
  cd quicknode-assignment && npm i
  ```

- Copy the Environment variable from `.env.example` file in `.env.local` file and replace the value for API Key in .env.local

  ```sh
  cp .env.example .env.local
  ```

- Run the Next App

  ```sh
  npm run dev
  ```

## Technical Questions

### Going in to as much detail as you want, describe how you would build a system that meets the following requirements: 

  ```
  Q1. Handles user authentication
    ● Would you need a database? 
    ● Which one and what might the schema look like? - Are their pros/cons to a specific choice? (SQL vs NoSQL)

  Ans. User authentication can be handled in multiple ways as follows :
  - Username and password
  - OAuth

  We would need a database to store the user information when user registers on the portal and retrieve the details when a registered user signs in. We can use mongoDB, firebase, postgreSQL or any other SQL/NoSQL Database for this purpose which suits the needs for the project.

  The schema for MongoDB would look something like :

  const UserScehema = new mongoose.Schema(
    {
      username: {
        required: true,
        type: String,
      },
      email: {
        required: true,
        type: String,
      },
      googleId: {
        required: true,
        type: String,
      },
      accessToken: {
        required: false,
        type: String,
      },
      refreshToken: {
        required: false,
        type: String,
      },
      passwordHash: {
        required: false,
        type: String,
      },
      image: {
        required: true,
        type: String,
      },
    },
    { timestamps: true },
  );

  For user authentication specfically, we can use any database and it wouldn't make much of a difference. The database is selected on the basis of buisness requirements and data we are storing. If we are storing strongly interconnected data, then SQL is a better choice since in a single query we can fetch all the related data and we wouldn't need to do multiple queries. If the data is seperated and not strongly interconnected then we can use NoSQL database.
  ```

  ```
  Q2. Serves data to the client via an API
    ● What kind of API would you use?

    Ans. When we talk about serving data to client via API, we have majorly two options that is REST and GraphQL.

    REST being the traditional approach for sending data over HTTP has gained very high adoption rate.

    REST is a great solution but it has some limitations like multiple rounds for getting related data, underfetching and overfetching. All these limitations can be solved by using GraphQL.

    If we are building APIs that exposed to customers and people so as to fetch data from our system then REST is a good options since it is easy to implement and at the same time it has really high adoption among developers.

    If the APIs are for internal use, like they fetch data from server and display on the website or mutate the data from the website operations then GraphQL is a way to go since it provides some pretty significant performance improvements and at the same time solves the problem of underfetching and overfetching.
  ```
  ```
  Q3. Scales to handle thousands of requests per second
    ● This could involve a lot of different optimizations, but what would you try first or what are the top three you might consider?

  Ans. First way of scaling the system to handle thousands of requests per second will be vertically scaling the service and then doing horizhontal scaling. Multiple replicas of high demand services will be run with a load balancer like Nginx in the front to distribute the load equally.

  Once we scale up the service to a threshold, the database will start becoming the bottleneck so a replicaset deployment of database would be needed where there will be 1 primary node on which write operations will be done and it will be replicated to the secondary nodes. Read operation can be done from any of the nodes so it will remove the bottleneck from the database.

  Once above two things are done, we can cache the DB results in LRU cache for each instance so for same query it would not go to the server but first check LRU cache for the data.

  Finally architecture would look something like this:
  ```
  ![image](https://user-images.githubusercontent.com/56197821/190384580-8bab2823-24ce-45b8-bc08-97864983683e.png)

  ```
  Q4. Provides real-time updates to clients as new data is available

  Ans. The first obvious way we could use is Sockets to update clients with new data. The problem with socket connection is that it is a full blown TCP connection and when scaling to large number of connections, it becomes a bottleneck for the server.

  One optimization we can do on socket connections is to multiplex the socket connections for a client. Suppose a client has 3 socket connections for different purposes then we could multiplex them into one so that only connection is needed to be handled by the server per client.

  The best optimization is Server Sent Events. We can use SSE to update the clients, the benefit of that over socket is that it is still a HTTP connection and it is not upgraded to a TCP connection so Server Sent Events are a great way to update clients with new data and SSE can be scaled pretty easily.
  ```


