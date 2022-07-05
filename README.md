Setup using instructions in https://tailwindcss.com/docs/guides/create-react-app


## For backend routes

Controller actions/methods by convention is done on **users_controller.rb**

## A few definitions to state
- Database Model name is called **User**, every CRUD action is performed on it e.g. User.new(params), User.all etc
### in users_controller.rb
- set_user() method defines an attribute **@user** that defines a specific activerecord row according to params[:id]
- user_params() method is used to define the accepted keys/symbol from the JSON acquired from form data


**Endpoint API for GET request**
> **localhost:3000/api/v1/users**
> returns **all** existing records in ActiveRecord by calling User.all and renders the json request
> 
**POST request**
> Need to explicity declare the route for POST in **routes.rb**, resources :users does not automatically declare this for you not sure why.
> Upon clicking next in web-app, users#create controller action is invoked, specifically api/v1/users#create;
> Adds a new record by calling User.new() in the **create** action

**GET request with phone number**
> **localhost:3000/api/v1/profile/:phone_number** ; returns the entire record based on the provide :phone number params

**PATCH request with phone number**
> **localhost:3000/api/v1/profile/:phone_number** ; calls the action users#update and updates the activerecord row based on phone number

**DELETE request with phone number**
> **localhost:3000/api/v1/profile/:phone_number** ; locates record by phone_number,  calls the action users#delete and removes record
> e.g. curl -X DELETE http://127.0.0.1:3000/api/v1/profile/91234567 using terminal

## How to access activerecord on terminal
- bundle exec rails console
- User.all  --> returns all records

## How to get/post/update/delete rails API using cURL without the need of a frontend form
Type this command in the terminal:
- curl -d"user[full_name]=dyima" -X PATCH http://127.0.0.1:3000/api/v1/profile/98765432
This command performs a PATCH request to the specified URL with data field "full_name": dyima
-d flag is to write to the URL
- Awesome curl tutorial: https://gist.github.com/subfuzion/08c5d85437d5d4f00e58
## Database schema
> passport records is from full_name onwards
The headers are exactly what is used when passing the JSON data from frontend to rails endpoint API.

**| id | display_name | title | email | phone_number | full_name | passport_no | passport_expiry | nationality | gender | dob |**

# TODO:


1. **Next Sprint**: Multi-user registration, nested database is expected, how to populate and retrieve data from activerecord



# Installing PostgreSQL

### In order to deploy database using production, we have to use PostgreSQL locally and it's the default for GCP


**Run the following command in sequence**

> These are used to install the dependencies before installing PostgreSQL

sudo apt install wget ca-certificates <br />
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - <br />
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' <br />

> Installing PostgreSQL, the command installs the latest version of it

sudo apt install postgresql postgresql-contrib

Upon installing, the server does not automatically gets started up we can use **service postgresql status** to check. <br />
If it's down, run **sudo service postgresql start** to start the service. <br />
Now you can check that port 5432 (postgreSQL server port) is online.

## Creating a new user role for DB
> A super user role used to create database, manage permissions and authorization. Run the following commands

sudo -u postgres createuser -s *your_linux_username* -P

Now a user is created, we can create a new DB using postgreSQL command line. Run: *sudo -u postgres psql* to activate it. <br />
The *postgres=#* line indicates that you are a running postgreSQL console.



