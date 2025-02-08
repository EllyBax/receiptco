import { print } from 'receiptio';

const markdown = `^^^RECEIPT

12/18/2021, 11:22:33 AM
Asparagus | 1| 1.00
Broccoli  | 2| 2.00
Carrot    | 3| 3.00
---
^TOTAL | ^6.00`;

print(markdown, '-d 192.168.0.115 -c 9100').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});
