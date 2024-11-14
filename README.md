# Arvan Cloud Task Dashboard - Version 1.0.0

![Arvan Cloud Task Demo](https://github.com/Mohammadreza-rzz/arvancloud-task/blob/main/ezgif-5-2d4ff55710.gif?raw=true)

## Project Overview

Arvan Cloud Task Dashboard is an admin panel designed to manage multiple actions, including an authentication system, displaying an articles table across several pages, and actions for editing, deleting, and adding articles. This dashboard is built with **Next.js** and follows designs available at the following link:

[Zeplin Project Designs](https://app.zeplin.io/project/5fd4b72c87eefa875c37b22b/dashboard)

### This project has been implemented with two different scenarios:
- **SSR Scenario**: Deployed on the `ssr-realworldApp` branch.
- **CSR Scenario**: Deployed on the `csr-realworld` branch.

Detailed explanations for each of these scenarios are provided below.

Additionally, this project uses APIs from the **RealWorld** project, with documentation available at:

[RealWorld API Documentation](https://github.com/gothinkster/realworld/blob/main/api/Conduit.postman_collection.json)

You can also explore the custom APIs defined within this project. Instructions for using these APIs are provided in the respective sections below. The API collection documentation is included in the project:

[ArvanCloud Task API Documentation](https://github.com/Mohammadreza-rzz/arvancloud-task/blob/main/arvanCloud_task-api.postman_collection.json)

### See the live version:

[Live Demo (SSR)](https://arvancloud-task-ssr-realworldapi.vercel.app/)

---

## Prerequisites

To set up and run this project, you need:

- **Node.js**: v14.0 or higher (recommended: latest LTS version)
- **npm**: v6.0 or higher or **Yarn** (optional)

You can download the latest version of Node.js from the official [Node.js website](https://nodejs.org/).

---

## Installation Steps

Follow these steps to get the project up and running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/project-name.git

2\. Navigate to the project directory

Move into the project directory:

bash

Copy code

cd project-name

3\. Install dependencies

To install the required packages for the project, use:

bash

Copy code

npm install

This will install both dependencies and devDependencies. Here's a quick breakdown of the packages that will be installed:

Dependencies:

@hookform/resolvers: Used for integrating validation with react-hook-form.

axios: A promise-based HTTP client for making API requests.

bcryptjs: A library for hashing passwords.

clsx: A utility for conditionally applying CSS class names.

jsonwebtoken: Used for working with JSON Web Tokens.

mongoose: MongoDB object modeling for Node.js.

next: The React framework for building server-side rendered and static web applications.

react, react-dom: Core libraries for React.

react-hook-form: A library for handling form validation and state.

react-lottie: A library for integrating Lottie animations in React.

react-paginate: A pagination component for React.

react-select: A flexible and customizable select input component for React.

react-toastify: A library for showing notifications.

tailwind-merge: A utility for merging Tailwind CSS class names.

yup: A schema validation library.

DevDependencies:

@commitlint/cli: CLI tool for enforcing conventional commit messages.

@commitlint/config-conventional: Configuration for commitlint to follow conventional commit standards.

@types/\*: TypeScript types for various libraries like bcryptjs, jsonwebtoken, node, react, react-dom, and react-lottie.

eslint, eslint-config-airbnb: Code linting tools and Airbnb's JavaScript style guide.

eslint-plugin-\*: Plugins for linting specific patterns, such as unused imports and React hooks.

postcss: A tool for transforming CSS with JavaScript plugins.

prettier, prettier-plugin-tailwindcss: Code formatting tools, including a plugin for Tailwind CSS support.

tailwindcss: A utility-first CSS framework.

typescript: The TypeScript compiler for type-checking.

If you encounter any issues during installation, try running:

bash

Copy code

npm install --force

This will bypass potential dependency conflicts and force the installation.

4\. Set up environment variables

Create a .env.local file in the root directory of your project.

Add the following environment variables to the .env.local file:

bash

Copy code

NEXT\_PUBLIC\_BASE\_URL=http://5.34.201.164:3000/api

NEXT\_BASE\_URL=http://localhost:3000

NEXT\_PUBLIC\_BASE\_URL should be set to the URL of your API (this is for frontend API calls).

NEXT\_BASE\_URL should be set to the address where your project is running locally (typically http://localhost:3000 if running locally).

If you plan to use the API integrated into the project, add the following additional variables for MongoDB and JWT authentication:

bash

Copy code

MONGODB\_URI=mongodb+srv://ArvanCloud:vXMNbsl2qComToXX@cluster0.awink.mongodb.net/

JWT\_SECRET=86d6648fa75e4adab0e1964ee1080b1de225bbb83b64641065b0a5f97f62565b

JWT\_REFRESH\_SECRET=9f5a33a7a2d9a9975b4c26cab01bae2e217f0c9eea5c641b0488b1eedeb6a1ab

MONGODB\_URI: The URI for your MongoDB connection.

JWT\_SECRET: The secret key used to sign JWT tokens.

JWT\_REFRESH\_SECRET: The secret key used for refresh tokens.

5\. Run the development server

Start the development server with the following command:

bash

Copy code

npm run dev

Once the server is running, open http://localhost:3000 in your browser to view the application.

SSR (Server-Side Rendering) in the Project

In this project, SSR (Server-Side Rendering) is implemented to render content on the server before sending it to the client. This method is used to improve the SEO of the application and reduce the time it takes for the user to see the page content. When a user makes a request, the server prepares the page with all the necessary data, ensuring the user receives a fully rendered page immediately.

This project is implemented in two branches:

Main Branch

SSR-RealWorld Branch

How SSR is Implemented:

In the SSR-RealWorld branch, the project uses server-side rendering to render the content on the server. The following approach is taken for authentication using cookie-based authentication:

Authentication Flow:

When a user logs in, the login action (server-side method) is triggered. The API returns a token upon successful login.

The token is then set in the browser's cookies as an HTTP-only cookie, which prevents client-side JavaScript from accessing it. This cookie is valid for one day.

As long as the cookie is valid, the user has access to the protected content of the application.

Once the cookie expires (after one day), it is automatically removed, and the user is logged out of the application.

Middleware for Authentication:

This authentication mechanism is handled through middleware.

The middleware ensures that specific routes are protected based on the user's login state.

Routes like register and login are accessible without authentication, while protected routes require the user to be logged in.

The middleware verifies whether a valid token exists in the cookies before granting access to protected routes.

Route Handling:

To define which routes are public and which are protected, you can refer to the route definitions in the route.ts file located in the root directory.

You can customize the routes and their access control, such as marking routes as public or protected based on the user's authentication state.

Server-Side Requests:

All GET requests are sent from the server side, which means the data is fetched and processed on the server before being rendered to the user.

Additionally, for actions such as form submissions, server-side actions (using server-side methods) are used to handle the form data, ensuring that the processing occurs securely on the server.

By using SSR and cookie-based authentication, this branch provides a secure, efficient, and SEO-friendly approach to rendering and managing user authentication.

CSR (Client-Side Rendering) in the Project

In the CSR-RealWorld branch, the project is implemented using a standard React approach, where Client-Side Rendering (CSR) is used. In CSR, the rendering of content happens entirely on the client side, and the application relies heavily on JavaScript to display content. This approach is more dynamic and responsive but can be slower for the initial load, as the page is built entirely in the browser after JavaScript is loaded.

How CSR is Implemented:

In this version, the CSR-RealWorld branch uses local storage or session storage for authentication and client-side routing. Here's how it works:

Authentication with Local Storage or Session Storage:

Token Storage:

Instead of using server-side cookies as in SSR, in the CSR approach, the authentication token is stored on the client side, either in localStorage or sessionStorage.

localStorage persists the token even after the browser is closed, while sessionStorage clears the token when the browser or tab is closed.

The stored token is used to authenticate the user for future API requests and protect routes.

Protected Routes:

In CSR, each route that needs protection must check the authentication token independently.

For every protected route, a check is made to see if the token exists in the storage (either localStorage or sessionStorage). If the token is present and valid, the user is allowed to access the route; otherwise, they are redirected to the login page.

API Requests:

In CSR, all API requests are made from the client side, meaning the request is sent directly from the user's browser. This is done through React Query, which simplifies data fetching and state management for client-side applications.

React Query is used to fetch, cache, and sync data from APIs, providing automatic re-fetching and caching mechanisms, improving performance and user experience on the client side.

Overview of Client-Side Rendering (CSR):

Client-Side Rendering is an approach where the browser downloads a basic HTML skeleton, then uses JavaScript to dynamically render content on the page. It loads the necessary JavaScript bundles and renders content in the browser after the page has been loaded.

Advantages of CSR:

Fast navigation: Once the app is loaded, navigating between pages is much faster because the page doesn't need to be re-rendered from the server every time.

Reduced server load: Since rendering happens on the client, the server only needs to send data (usually in the form of API responses) instead of rendering the entire page each time.

Improved user experience: CSR allows for a highly interactive and dynamic user interface.

Disadvantages of CSR:

SEO challenges: Since the page is rendered client-side, search engines may have difficulty indexing dynamic content that is generated through JavaScript.

Initial load time: The initial load can be slower compared to SSR since the browser must load all JavaScript before displaying the content.

Summary of CSR Approach in the Project:

In the CSR-RealWorld branch, the project utilizes a client-side authentication method by storing tokens in either localStorage or sessionStorage. Authentication checks are done on each route individually to ensure that users can only access protected routes if they have a valid token. All API requests are made from the client-side using React Query, which makes it easier to manage data fetching and caching, creating a smooth and responsive experience for the user.

Custom API Implementation in the Project (Backend)

In this project, the custom APIs are implemented using Next.js API routes. These API routes allow for seamless server-side logic and backend operations to be integrated directly into the Next.js framework. The MongoDB database is utilized for storing and managing data related to user authentication and article management. The implementation of these APIs is found in the api-backend branch.

Here’s a breakdown of the key custom APIs for handling user authentication, articles, and database interactions:

1\. User Authentication APIs

/api/auth/register:

Method: POST

Purpose: Registers a new user in the system.

Request Body:

email: The user's email address.

username: The user's chosen username.

password: The user's password.

Process:

The API checks if the provided email is already registered in the database.

If the email is not registered, it hashes the password using bcrypt and stores the user details (email, username, hashed password) in the MongoDB database.

A success message is returned upon successful registration.

/api/auth/login:

Method: POST

Purpose: Authenticates an existing user and returns JWT tokens.

Request Body:

email: The user's email address.

password: The user's password.

Process:

The API checks whether the user exists in the database by matching the provided email.

It compares the provided password with the hashed password stored in the database using bcrypt.

If the password is correct, it generates JWT tokens (access token and refresh token). The access token is used for authenticating protected routes, while the refresh token can be used to obtain a new access token after it expires.

2\. Article Management APIs

The project includes separate routes for handling article operations such as creating, updating, deleting, and retrieving articles.

/api/articles/add:

Method: POST

Purpose: Adds a new article to the system.

Request Body:

title: The title of the article.

content: The content of the article.

author: The author of the article.

Process:

This API accepts the article data, stores it in the MongoDB database, and returns the created article.

/api/articles/get:

Method: GET

Purpose: Retrieves all articles from the database.

Process:

The API fetches a list of all available articles from the database and sends them back to the client.

/api/articles/update:

Method: PUT

Purpose: Updates an existing article.

Request Body:

articleId: The ID of the article to be updated.

Updated article data such as title, content, etc.

Process:

The API searches for the article by its ID and updates it with the provided new data.

/api/articles/delete:

Method: DELETE

Purpose: Deletes an article from the database.

Request Body:

articleId: The ID of the article to be deleted.

Process:

The API deletes the article with the specified ID from the MongoDB database.

API Overview and Database Integration

MongoDB:

All data related to user authentication (such as email, username, password) and articles (such as title, content, author) are stored in MongoDB, a NoSQL database.

The data is stored in collections (such as a users collection and an articles collection) within the MongoDB database.

MongoDB provides flexibility in handling dynamic and scalable data structures, making it suitable for projects that require efficient data handling and storage.

Next.js API Routes:

Next.js API routes are used for creating these custom APIs. They enable you to handle HTTP requests (like POST, GET, PUT, and DELETE) within the same application.

Each API route corresponds to a specific endpoint, processes requests, interacts with the database, and returns responses.

By using Next.js API routes, you can write server-side logic directly in the project, simplifying the process of connecting your front-end and back-end.

Usage

To interact with these APIs, you can send HTTP requests from the client-side (using Axios, React Query, or the native fetch function) to the corresponding routes. These endpoints are designed to handle authentication, article management, and other actions that the application requires.

Authentication: The authentication process uses JWT tokens to secure routes and ensure that users are authorized to access protected content. Users can log in and register through the /api/auth/login and /api/auth/register endpoints.

Article Management: The article-related endpoints allow users to add, update, delete, and fetch articles through the /api/articles routes. All of these interactions are handled server-side and stored in MongoDB.

Integration in the Project (api-backend Branch)

All the custom APIs described above are implemented in the api-backend branch of the project. This branch contains all the logic related to authentication and data management through Next.js API routes and MongoDB. These APIs handle user authentication, including JWT token generation and validation, as well as operations related to managing articles. By using these APIs, the application can efficiently manage user access and content creation.

SSR and CSR Branches Overview

The project is implemented using two different approaches: SSR (Server-Side Rendering) and CSR (Client-Side Rendering). The implementation relies on APIs, which act as the backend, providing functionality for authentication, article management, and more.

SSR Implementation

In the SSR branch (specifically ssr-realworld), the project is built using server-side rendering with Next.js. Authentication (login and registration) is handled through tokens. The authentication flow works as follows:

Login and Registration with Tokens:

The login and registration process uses JWT (JSON Web Tokens) for authentication. Tokens have different expiration periods:

Access Token: Valid for 15 minutes.

Refresh Token: Valid for 1 day.

Token Management with Cookies:

When the user logs in, the server sends the access token and refresh token back to the client.

The access token is stored in an HTTP-only cookie, ensuring it is secure and not accessible via JavaScript.

The refresh token is stored in a separate cookie and is used to generate a new access token once the old one expires.

Token Refresh Mechanism:

The middleware checks if a refresh token is present. If a valid refresh token is available but the access token is expired or missing, a new access token is generated using the refresh token.

This ensures that the user remains logged in without needing to re-enter their credentials as long as the refresh token is valid.

Middleware:

Middleware in Next.js handles the validation and management of the tokens, ensuring that users can only access protected routes if they have a valid access token.

If the user has a valid refresh token, a request is made to the backend to refresh the access token. If the refresh token is invalid or expired, the user is logged out.

Certain routes like register and login are accessible without authentication, while protected routes require the user to be logged in.

Note: Currently, the system only supports login, registration, and token refresh. Other parts of the authentication system (like logout or role-based access control) are still being implemented.

CSR Implementation

The CSR branch (csr-realworld) implements the client-side rendering approach. Here, authentication works differently:

Authentication with Local Storage / Session Storage:

In this version, the JWT tokens are stored in either localStorage or sessionStorage instead of HTTP-only cookies.

The token is stored on the client-side and is sent along with each request to the backend to authenticate the user.

Protected Routes:

Protected routes must be manually checked in the frontend for authentication by verifying the presence and validity of the token.

For each route, the token is checked, and if it is valid, the user is allowed to access the route. Otherwise, they will be redirected to the login page.

API Calls Using React Query:

In the CSR version, all API calls are made from the client-side using React Query, which handles fetching, caching, and syncing data with the backend.

These API calls interact with the backend to authenticate users, manage articles, and perform other actions.

Ongoing Development and Backend APIs

Both the SSR and CSR branches rely on custom backend APIs to handle user authentication, article management, and other business logic. These APIs are designed to manage user sessions, validate JWT tokens, and manage CRUD operations for articles. The backend APIs are implemented using Next.js API routes and MongoDB as the database.

While the login and registration with token handling have been fully implemented in both branches, additional features like logout and role-based access control are still under development.

Token Expiry and Refresh: The SSR branch currently handles token expiry and refresh operations, ensuring users can stay logged in without re-authenticating frequently.

Article Management APIs: CRUD operations for articles (adding, updating, deleting, and fetching articles) are available and are used across both SSR and CSR implementations.

As development progresses, more features, including complete user management, authorization, and other functionalities, will be added.
