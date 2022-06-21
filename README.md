Setup using instructions in https://tailwindcss.com/docs/guides/create-react-app


## For backend routes

Controller actions/methods by convention is done on **users_controller.rb**

## A few definitions to state
- Database Model name is called **User**, every CRUD action is performed on it e.g. User.new(params), User.all etc
- set_user() method defines an instance **@user** that defines a specific activerecord row according to params[:id]
- user_params() method is used to define the accepted keys/symbol from the JSON acquired from form data


**Endpoint API for GET request**
> localhost:3000/api/v1/users
> returns **all** existing records in ActiveRecord by calling User.all and renders the json request

**GET route with params[:id]**
> localhost:3000/api/v1/users/:id;
> :id is an integer, returns the specific record as specified by the id;
> same concept can be used to get phone number e.g params[:phone_number]

**POST request**
> Need to explicity declare the route for POST in **routes.rb**, resources :users does not automatically declare this for you not sure why.
> Upon clicking next in web-app, users#create controller action is invoked, specifically api/v1/users#create;
> Adds a new record by calling User.new() in the **create** action

**GET request with phone number**
> **localhost:3000/api/v1/profile/:phone_number** ; returns the entire record based on the provide :phone number params

**PATCH request with phone number**
> **localhost:3000/api/v1/profile/:phone_number** ; calls the action users#update and updates the activerecord row based on phone number

## How to access activerecord on terminal
- bundle exec rails console
- User.all  // returns all records

## How to get/post/update/delete rails API using cURL without the need of a frontend form
Type this command in the terminal:
- curl -d"user[full_name]=dyima" -X PATCH http://127.0.0.1:3000/api/v1/profile/98765432
This command performs a PATCH request to the specified URL with data field "full_name": dyima
-d flag is to write to the URL

## Database schema (unconfirmed for passport)
> passport records is from full_name onwards
The headers are exactly what is used when passing the JSON data from frontend to rails endpoint API. So try to stick to this convention where it is easily readible

**| id | display_name | title | email | phone_number | full_name | passport_no | passport_expiry | nationality | gender | dob |**

# TODO:
1. Standardize the keys in the passport.js such that the keys can be readily passed to a JSON object e.g. "passport_no" : "1234556A"

2. Since details.js already updates activerecord, I do not want to create a new record when the **SAME** user enter their details in the passport page
I want to somehow extract the id of that particular user and continue to populate the remaining fields of the activerecord e.g. passport_no, dob, full_name etc

3. Return the user's data to frontend once phone_number is passed to the backend to repopulate the form

4. **Next Sprint**: Multi-user registration, nested database is expected, how to populate and retrieve data from activerecord




