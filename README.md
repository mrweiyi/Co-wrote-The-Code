online judge system

Web Development: Collaborative Online Judge System                                         
-  Implemented a web-based collaborative code editor supporting multiple user editing simultaneously, with designed capacity of 100,000 daily active user (ACE, Socket.io, Redis);
-  Designed and developed a single-page web application for coding problems (Angular2, Auth0, Node.js, MongoDB);
-  Built a user-code executor service which can build and execute user's code (Docker, Flask);
-  Refactored and Improved system throughput by decoupling services using RESTful API and loading balancing by Nginx (REST API, Nginx).




# install angular/cli
sudo npm install -g @angular/cli@latest

# init new project
ng new oj-client

# add components
../online judge system/oj-client$ cd src/app
../oj-client/src/app$ mkdir components

# add component named problem-list
../oj-client/src/app/components$ ng g c problem-list 
(-it inline templete ; -is inline style)


ng serve
