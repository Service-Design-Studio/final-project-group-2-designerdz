FROM ruby:3.1.2

RUN apt-get update 

COPY . .

RUN gem install bundler && bundler install 

# ENV RAILS_ENV=production
# # Redirect Rails log to STDOUT for Cloud Run to capture
# ENV RAILS_LOG_TO_STDOUT=true
# # [START cloudrun_rails_dockerfile_key]
# ARG MASTER_KEY
# ENV RAILS_MASTER_KEY=${MASTER_KEY}
# # [END cloudrun_rails_dockerfile_key]

EXPOSE 8080

CMD ["bin/rails", "server", "--port", "8080" , "-b", "0.0.0.0"]