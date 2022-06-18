FROM ruby:3.1.2




# Install production dependencies.
WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN apt-get update 
RUN gem install bundler && bundler install 


COPY . /app

RUN bundle exec rails db:create
RUN bundle exec rails db:migrate
RUN bundle exec rails db:seed

EXPOSE 8080

CMD ["bin/rails", "server", "--port", "8080" , "-b", "0.0.0.0"]