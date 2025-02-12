import { print } from 'receiptio';

const markdown = `^^^RECEIPT

12/18/2021, 11:22:33 AM
Asparagus | 1| 1.00
Broccoli  | 2| 2.00
Carrot    | 3| 3.00
---
^TOTAL | ^6.00`;

async function printWithRetry(markdown, options, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await print(markdown, options);
            console.log(`Print successful: ${result}`);
            return result;
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`Failed after ${maxRetries} attempts:`, error);
                throw error;
            }
            console.log(`Attempt ${attempt} failed. Retrying in ${delay/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage
printWithRetry(markdown, '-d 192.168.0.115 -c 48')
    .then(result => {
        // Handle success
        console.log('Print successful:', result);
    })
    .catch(error => {
        // Handle final failure
        console.error('Final failure:', error);
    });