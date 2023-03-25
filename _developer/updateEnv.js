import axios from "axios";
import { readFile, writeFile } from "fs";

// Make a request for a user with a given ID
axios.get('http://localhost:4040/api/tunnels')
  .then(function (response) {
    // handle success
    console.log('ONLY FOR DEV MODE! NGROK URL: ');
    const publicURL = response.data.tunnels[0].public_url; 

    // Open and read .env file
    readFile('.env', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let searchString = 'SHOPIFY_APP_URL=';
      let re = new RegExp('^.*' + searchString + '.*$', 'gm');
      let formatted = data.replace(re, 'SHOPIFY_APP_URL='+publicURL);
    
      writeFile('.env', formatted, 'utf8', function(err) {
        if (err) return console.log(err);
      });
    });    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });