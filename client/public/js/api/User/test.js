let myVariable; // Declare the variable in a higher scope


function assignVariable() {
    myVariable = "Hello, world!"; // Assign a value to the variable
}

function useVariable() {
    console.log(myVariable); // Use the variable in another function
}


useVariable(); // Output: "Hello, world!"
