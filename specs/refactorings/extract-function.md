# Extract Function

```javascript
// before
function printOwing(invoice) {
    printBanner()
    
    let outstanding = calculateOutstanding()
    
    // print details
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${outstanding}`)
}

// after
function printOwing(invoice) {
    printBanner()
    
    let outstanding = calculateOutstanding()
    
    printDetails(invoice, outstanding)
    
    function printDetails(outstanding) {
        console.log(`name: ${invoice.customer}`)
        console.log(`amount: ${outstanding}`)
    }
}
```

## Motivation

If you have to spend effort looking at a fragment of code and figuring out what it's doing, 
then you should extract it into a function and name the function after the "what."
Then, when you read it again, the purpose of the function leaps right out at you. Most of the time you won't need to care about
how the function fulfills its purpose (which is the body of the function).

## Mechanics

- Create a new function, and name it after the intent of the function (name it by what it does, not by how it does it)
- Copy the extracted code from the source function into the new target function.
- Scan the extracted code for references to any variables that are local in scope to the source function and will not be in scope for the extracted function. Pass them as parameters.
- Compile after all variables are dealt with.
- Replace the extracted code in the source function with a call to the target function.