# Core Technologies Used
- ReactJS: For frontend components
- TailwindCSS: For CSS Styling
- Axios: A HTTP Library For interacting with our backend APIs
- React-Router: Server Side routing library

# References 
- https://www.codingdeft.com/posts/react-deploy-google-cloud-app-engine/
- https://tailwindcss.com/docs/guides/create-react-app
- https://www.knowledgehut.com/blog/web-development/axios-in-react
- https://reactrouter.com/docs/en/v6/getting-started/tutorial
- https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react

# Initial Setup Instructions
1. Follow instructions in https://tailwindcss.com/docs/guides/create-react-app to set up React and Tailwind basic app structure
2. Install Axios using `npm install axios`. This is used for interacting with backend APIs
3. Install React Router using `npm install react-router-dom`. This is used for server side routing

# Development in Local
    npm run start

# Deployment to Production
    npm run build
    gcloud init
    gcloud app deploy
