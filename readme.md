step to run project:

1) /sportz-demo $ npm install               //for node packages
2) /sportz-demo/frontend $ npm install      //for angular packages
3) /sportz-demo $  node app.js              //for node server
4) /sportz-demo/frontend $  ng serve -o     //for angular server

Note: 
make sure your localhost runs on "http://127.0.0.1" domain for node if not please make changes on below files
1) .env => change "APP_URL" key value
2) frontend/src/services/country.service.ts = change "rootUrl" key value 