Fancy Todo Project. Simple web application to manage Your TODO List. 
This app has features such as :

* Register
* Login
* Login with Google
* Create Todo List
* Edit Todo List
* Delete Todo List
* See all Todo List sort by status

------------------

Fancy Todo Guides:

* Login - this button will direct you to our main page
* Register - this button will store your data as a user to the application
* Google Button - this button will allow you to register using your google account
* Logout - this button will log yourself out from the application
* Add Todo - this button will help you to create new Todo
* Edit - this button will help you to edit your Todo list
* Status - this button will provide the status of your Todo list
  These are the button option for the status of your Todo list
  * hasn't started
  * on progress
  * done 

Error responses

(500 - Unknown error)
{ "message": "Interval Server Error" }

---
## POST /register
> Create a new user account
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  email: <email input>,
  password: <password input>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "password": <hashed password>,
    "updatedAt": "2020-05-05T08:39:37.867Z",
    "createdAt": "2020-05-05T08:39:37.867Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": "Input the right email/ password"
}
```
---
## POST /login
> Login for Existing User
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  email: <input email>,
  password: <input password>
}
```
_Response (200)_
```
{   
    "email": <listed email>
    "token": <created token>
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "Invalid email/password"
}
```
---
## POST /google-signin
> Google sign in 
_Request Header_
```
  no need
```
_Request Body_
```
{
  id_token: <given id_token>
}
```
_Response (200)_
```
{   
    "email": <listed email>
    "token": <created token>
}
```
---
## GET /todos
> Show All Todos
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
  {
    "id": 6,
    "title": "makan",
    "description": "indomie",
    "status": "done",
    "due_date": "2020-06-06T00:00:00.000Z",
    "createdAt": "2020-06-13T08:32:40.126Z",
    "updatedAt": "2020-06-13T08:32:40.126Z"
  },
  {
    "id": 1,
    "title": "fsafs",
    "description": "fsafsaf",
    "status": "not yet",
    "due_date": "2020-06-27T00:00:00.000Z",
    "createdAt": "2020-06-13T08:28:47.664Z",
    "updatedAt": "2020-06-13T08:28:47.664Z"
  }
]
```
```
_Response (400 - Bad request)_
```

---
## POST /todos
> Create Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
{
    "title": "fsafs",
    "description": "fsafsaf",
    "status": "not yet",
    "due_date": "2020-06-27T00:00:00.000Z",
}
```
_Response (201)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "due_date": "2020-06-06T00:00:00.000Z",
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}
```

```
_Response (400 - Bad request)_
```

---
## DELETE /todos/:id
> Delete Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id": <id todo>
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "not yet",
  "due_date": "2020-06-06T00:00:00.000Z",
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}
```

```
_Response (400 - Bad request)_
```

---
## GET /todos/:id
> Get data from selected id
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "done",
  "due_date": "2020-06-06T00:00:00.000Z",
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}
```

```
_Response (400 - Bad request)_
```

---
## PUT /todos/:id
> To submit Form Edit Todos
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Request Body_
```
{
    "title": "fsafs",
    "description": "fsafsaf",
    "status": "on progress",
    "due_date": "2020-06-27T00:00:00.000Z",
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "done",
  "due_date": "2020-06-06T00:00:00.000Z",
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}
```

```
_Response (400 - Bad request)_
```
