
Project Costing Application
A basic project costing app is a software tool designed to help businesses and individuals to estimate and manage the costs associated with their projects. This app enables users to create projects and track their costs in a simple and efficient way. Users can create multiple projects, set budgets, and add individual cost items to each project.


This Release Features (1.0.0)
1. Web Site
    a. Landing Page (Basic)
2. Auth Pages
    a. Registration Page
    b. Login Page
3. Admin Panel
    a. Project List Page with Pagination
    b. Project Details Page
    c. Dashboard Top Blocks
    b. Dashboard Top 7 Project Chart 

Next Sprint 
1. All Frontend Model implement and Validation (Except Project, thats partially done)
2. Settings Pages 
    a. Profile update
    b. Dynamic Application Title change according to menu
3. For Admin, website, auth saparate module
4. UserId add with cost collection



Requirement
Node >= 18.*.*
    

Before Start 
- Please Check .env for API and Frontend src>environment (Note: for project submission .env and environment both are now fill with value)
- Database:
    - Mongodb
    - Only by creating a dbname call `projectcosting` you can run project from clean boot
    - But i will suggested please import database that include with this project. It will help you all dashboard report visualization
    - Please Use this cred:
        EMail: najeeb@miu.edu
        Password: 132132132
    
all Screenshot Included

Dir Structure
- package.json (Boot both fe and api application)
- projectcosting-api (Backend Dir)
- projectcosting-fe (Backend Dir)
- Screenshot (All Screenshot)
- database (Database Backup)



Development 
-- Frontend & Backend Both
cd root dir
- npm install
- npm start


-- Only Frontend
npm installFrontend
npm startFrontend


-- Only Backend
npm installApi
npm startApi



Production
Upcomming


Deployment Script
Upcomming


Nodemon (For local development included in package.json) 
