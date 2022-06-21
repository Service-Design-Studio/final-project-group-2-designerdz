# Core Technologies Used
- ReactJS: For frontend components
- TailwindCSS: For CSS Styling
- Axios: A HTTP Library For interacting with our backend APIs
- React-Router: Server Side routing library
- React-Hook-Form: A library for creating forms in React
- PactumJS: A rest API testing tool
- Cucumber: A BDD testing tool
- Selenium: A webdriver for testing
- Chromedriver: Required dependency to use Selenium in chromedriver
- Chai: An assertion library for testing
- Datepicker: For the calendar dates on the details page
- JS-Cookies: A javascript API for handling cookies


# References 
- https://www.codingdeft.com/posts/react-deploy-google-cloud-app-engine/
- https://tailwindcss.com/docs/guides/create-react-app
- https://www.knowledgehut.com/blog/web-development/axios-in-react
- https://reactrouter.com/docs/en/v6/getting-started/tutorial
- https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react
- https://react-hook-form.com/form-builder
- https://www.npmjs.com/package/pactum
- https://github.com/cucumber/cucumber-js

# Initial Setup Instructions

1. Follow instructions in https://tailwindcss.com/docs/guides/create-react-app to set up React and Tailwind basic app structure
2. Install Axios using `npm install axios`. This is used for interacting with backend APIs
3. Install React Router using `npm install react-router-dom`. This is used for server side routing
4. Install React Hook Form using `npm install react-hook-form`. This is used for creating forms in React
5. Install PactumJS using `npm install pactum`. This is used for testing REST APIs
6. Install Cucumber using `npm install @cucumber/cucumber`. This is used for creating BDD tests
7. Install Selenium using `npm install selenium-webdriver`. This is used for testing webpages
8. Install Chromedriver using `npm install chromedriver`. This is required to use Selenium in chromedriver
9. Install Chai using `npm install chai`. This is an assertion library for testing
10. Install datepicker  `npm install react-datepicker`. This is for the Calendar dates on the Details page. 
11. Install js-cookie using `npm install js-cookie`. This is for us to validate whether a user is a new user or has an active session. 

# Development in Local

    npm run start

# Running Cucumber Tests
    npx cucumber-js # Ensure you are in src folder

# Deployment to Production

    npm run build
    gcloud init
    gcloud app deploy
