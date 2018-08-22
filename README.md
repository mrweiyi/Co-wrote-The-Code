Co-wrote the code!








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

#Install bootstrap
../oj-client$ npm install bootstrap@3 --save
../oj-client$ npm install jquery --save

# create Service
../oj-client/src/app/services$ ng g s data

ng serve
