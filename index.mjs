import {
    DynamoDBClient,
    PutItemCommand,
} from "@aws-sdk/client-dynamodb";

import { uuid } from 'uuidv4';

const dynamodb = new DynamoDBClient({
    apiVersion: "2012-08-10"
});

exports.handler = async (event) => {
    try {
        console.log('Raw input data:', event); // Add this line to log the raw input data

        const formData = {
            name: event.name,
            email: event.email,
            subject: event.subject,
            message: event.message,
        };

        const item = {
            SubmissionId: generateUUID(), // Generate a UUID
            ...formData, // Use the form data as attributes
        };

        // Store the form data in DynamoDB
        await storeFormData(item);

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Form submitted successfully'}),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Error submitting the form'}),
        };
    }
};

async function storeFormData(item) {
    const params = {
        TableName: 'ContactFormEntries',
        Item: item,
    };

    const command = new PutItemCommand(params);

    await dynamodb.send(command);
}

function generateUUID() {
    return uuid();
}