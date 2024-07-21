// Import the UUID library to generate unique IDs
const { v4: uuidv4 } = require('uuid');

let data = {
  event: {
    id: uuidv4(), // Generates a unique ID
    name: 'The Event',
    date: '2024-07-20T15:00:00Z'
  }
};

console.log(data);

module.exports = data;