// Import AWS SDK and UUID library
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Set to your AWS region
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Function to write an event to DynamoDB
const writeEventToDynamoDB = async (eventData) => {
  const params = {
    TableName: 'EventsTable', // DynamoDB table name
    Item: {
      id: uuidv4(), // Generate a unique ID for the event
      name: eventData.name,
      date: eventData.date
    }
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Event successfully added to DynamoDB');
  } catch (error) {
    console.error('Error adding event to DynamoDB:', error);
  }
};

// Function to read an event from DynamoDB by ID
const getEventFromDynamoDB = async (eventId) => {
  const params = {
    TableName: 'EventsTable', // DynamoDB table name
    Key: {
      id: eventId
    }
  };

  try {
    const data = await dynamodb.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error('Error getting event from DynamoDB:', error);
    return null;
  }
};

// Function to query events from DynamoDB by date
const queryEventsByDate = async (eventDate) => {
  const params = {
    TableName: 'EventsTable', // DynamoDB table name
    IndexName: 'DateIndex', // Global secondary index name
    KeyConditionExpression: 'date = :date',
    ExpressionAttributeValues: {
      ':date': eventDate
    }
  };

  try {
    const data = await dynamodb.query(params).promise();
    return data.Items;
  } catch (error) {
    console.error('Error querying events from DynamoDB:', error);
    return [];
  }
};

// Example usage of the functions
const exampleEvent = {
  name: 'Sample Event',
  date: '2024-07-20T15:00:00Z'
};

// Write an event
writeEventToDynamoDB(exampleEvent);

// Example ID for reading an event
const exampleEventId = 'a9f2e4c4-5b6d-4e6a-9c3d-7f5e8a4b0cde'; 
getEventFromDynamoDB(exampleEventId).then(event => console.log('Event:', event));

// Query events by date
queryEventsByDate('2024-07-20T15:00:00Z').then(events => console.log('Events on date:', events));
