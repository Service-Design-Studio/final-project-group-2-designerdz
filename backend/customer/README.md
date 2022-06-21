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
Step 3:` find ./ -type f -exec dos2unix {} \;` (in the repo you were trying to run your task on)

gcloud url:  
https://dbs-service-qz6esvmepq-as.a.run.app/


**Important**

1. Remember to <mark>disable billing</mark> to account when not using deployment site, SQL database in gcloud is expensive

2. Only enable billing when using the deployment site

<br>
<br>

# Populate below when avail

## Deployment instructions

## How to run the test suite

## Services (job queues, cache servers, search engines, etc.)
