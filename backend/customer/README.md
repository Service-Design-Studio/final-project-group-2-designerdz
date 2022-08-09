# README

This is Rails for **_API only_**, communication is done through json objects between Rails backend and React frontend

## Ruby version

- ruby, "3.1.2"
- rails, "7.0.3"

## System dependencies

- sqlite3 "1.4"
  - : for testing and development database
- pg "0.21":
  - for production database, as we use Postgresql for google cloud deployment
- rack-cors:
  - to be able to whitelist domains to establish connection with Rails backend

Rest of dependecies can be found in `Gemfile` of `/customer` directory

## Configuration

To change which domain to be able to request an Api to our Rails application:

`cors.rb` under `config/initializers`

change `origins "xxxx"` to the domain you want to communicate from:

- `"*"` to allow anyone

## Configuring routes

`routes.rb` file in `/config` folder

For example, to configure a routes called `/api/v1/users`

```ruby
Rails.application.routes.draw do
  namespace :api do #domain/api/
    namespace :v1 do #domain/api/v1
      resources :users #domain/api/v1/users
    end
  end
end
```

## Database initialization

Run these in your terminal

```
rails generate scaffold DB_NAME attribute1:type attribute2:type
rails db:migrate
```

To populate database with initial data:

```
rails db:seed
```

## Deployment to Google Cloud

"Permission denied :bin/rails" error: <br/>
`chmod u+x bin/rails` to make it executable

"env: ruby\r: No such file or directory" error

For MACOS users:<br/>
Step 1: `HOMEBREW_NO_AUTO_UPDATE=1 brew install dos2unix` <br/>
Step 2: `git config --global core.autocrlf input`<br/>
Step 3: `find ./ -type f -exec dos2unix {} \;` (in the repo you were trying to run your task on)

gcloud url:  
https://dbs-service-qz6esvmepq-as.a.run.app/

**Important**

1. Remember to <mark>disable billing</mark> to account when not using deployment site, SQL database in gcloud is expensive

2. Only enable billing when using the deployment site

<br>
<br>

## For backend routes

Controller actions/methods for parent is done on **users_controller.rb**
Controller actions/methods for child is done on **children_controller.rb**

## A few definitions to state

in models/child.rb or user.rb

- Database Model for parent is **User**, child is **Child**. Every CRUD action is performed on it e.g. User.new(params), User.all etc. <br />
- Every controller has access to each other's model because of association (belongs_to :user, has_many :children) declared in the respective files

in users_controller.rb/children_controller.rb

- set_user() method defines an attribute **@user** that defines a specific activerecord row according to params[:id] <br />
- user_params() method is used to define the accepted keys/symbol from the JSON acquired from form data

### API endpoints for parent

**Endpoint API for GET request**

> **localhost:3000/api/v1/users**
> returns **all** existing records in ActiveRecord by calling User.all and renders the json request

**POST request**

> Need to explicity declare the route for POST in **routes.rb**, resources :users does not automatically declare this for you not sure why.
> Upon clicking next in web-app, users#create controller action is invoked, specifically api/v1/users#create;
> Adds a new record by calling User.new() in the **create** action

**GET request with phone number**

> **localhost:3000/api/v1/users**

**PATCH requestr**

> **localhost:3000/api/v1/users/:id** ; calls the action users#update and updates the activerecord row based on id

**DELETE request**

> **localhost:3000/api/v1/profile/detele** ; **WARNING** deletes ALL record in the database, calls the action users#delete and removes record <br />
> It firsts deletes the Child's data followed by the parents <br />
> e.g. `curl -X DELETE http://127.0.0.1:3000/api/v1/profile/delete` using terminal

### API endpoints for child

**GET request for #index**

> **localhost:3000/children**
> Returns all records of children in one table, no filter

**GET request for #show**

> **localhost:3000/children/:id**
> Return 1 record of child by specifying the id

**GET request for #indexChild**

> **localhost:3000/parent/:user_id** <br />
> Customized method created to return all of parent's children specified by :user_id

**POST request for #create**

> **localhost:3000/children** <br />
> POST requires requires that you specify the parent's ID. e.g. give the field `user_id:1` to indicate it belongs to parent with id 1 <br /> > `curl -d"child[user_id]=1&child[full_name]=dyima" -X POST http://127.0.0.1:3000/children` example using curl

## How to access activerecord on terminal

- `bundle exec rails console`
- `User.all` --> returns all records

## How to get/post/update/delete rails API using cURL without the need of a frontend form

Type this command in the terminal:

- `curl -d"user[full_name]=dyima" -X PATCH http://127.0.0.1:3000/api/v1/users/1`
  This command performs a PATCH request to the specified URL with data field "full_name": dyima
  -d flag is to write to the URL
- Awesome curl tutorial: https://gist.github.com/subfuzion/08c5d85437d5d4f00e58

## Database schema

> passport records is from full_name onwards
> The headers are exactly what is used when passing the JSON data from frontend to rails endpoint API.

**| id | display_name | title | email | phone_number | full_name | passport_no | passport_expiry | nationality | gender | dob |**

# Installing PostgreSQL

### In order to deploy database using production, we have to use PostgreSQL locally and it's the default for GCP

**Run the following command in sequence**

> These are used to install the dependencies before installing PostgreSQL

`sudo apt install wget ca-certificates` <br />
`wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`<br />
`sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'` <br />

> Installing PostgreSQL, the command installs the latest version of it

sudo apt install postgresql postgresql-contrib

Upon installing, the server does not automatically gets started up we can use **service postgresql status** to check. <br />
If it's down, run **sudo service postgresql start** to start the service. <br />
Now you can check that port 5432 (postgreSQL server port) is online.

## Creating a new user role for DB

> A super user role used to create database, manage permissions and authorization. Run the following commands

sudo -u postgres createuser -s _your_linux_username_ -P

Now a user is created, we can create a new DB using postgreSQL command line. Run: _sudo -u postgres psql_ to activate it. <br />
The _postgres=#_ line indicates that you are a running postgreSQL console.
