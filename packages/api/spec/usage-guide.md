# L0172 Usage Guide

Welcome to the L0172 language guide. L0172 is a Graffiticode language designed for creating and manipulating basic expressions, lists, and functional programming constructs. You can access and use L0172 through the Graffiticode MCP tool or console, where you can describe your desired operations in natural language, and the system will generate the corresponding Graffiticode.

## What You Can Create with L0172

### Basic Expressions and Literals

L0172 allows you to perform arithmetic operations and handle basic data types such as numbers and strings. You can create expressions that add, subtract, multiply, and manipulate numbers or strings.

Example Requests:
- "Add 7 and 5."
- "Multiply 6 by 4."
- "Return the number 42."
- "Return the string 'hello'."

**Capabilities**: L0172 can perform basic arithmetic operations and return simple data types.  
**Limitations**: It cannot handle complex data structures or perform operations beyond basic arithmetic.

### Lists

L0172 supports operations on lists, including creating lists, accessing elements, and modifying lists.

Example Requests:
- "Return the list `[1, 2, 3]`."
- "Return the first element of `[5, 6, 7]`."
- "Append `[4, 5]` to `[1, 2, 3]`."
- "Create a list of numbers from 1 to 5 using `range`."

**Capabilities**: You can create lists, access elements, and perform basic list operations like appending and slicing.  
**Limitations**: It does not support complex list manipulations or nested list operations.

### Map, Filter, and Reduce

L0172 provides functional programming capabilities to map, filter, and reduce lists.

Example Requests:
- "Double every number in `[1, 2, 3, 4]`."
- "Keep only the even numbers in `[1, 2, 3, 4, 5, 6]`."
- "Sum all numbers in `[1, 2, 3, 4]`."
- "Filter out negative numbers from `[3, -1, 4, -2, 5]`."

**Capabilities**: You can apply transformations to lists, filter elements based on conditions, and aggregate list values.  
**Limitations**: It cannot perform complex transformations that require external data or state.

### Lambdas and Higher-Order Functions

You can define and use functions, including lambdas, to perform operations on data.

Example Requests:
- "Define a function `double` that multiplies a number by 2."
- "Map a lambda that squares numbers over `[2, 3, 4]`."
- "Reduce `[1, 2, 3, 4]` using addition."
- "Define a function `triple` and map it over `[1, 2, 3]`."

**Capabilities**: L0172 supports defining simple functions and using them in higher-order functions like map and reduce.  
**Limitations**: It does not support complex function definitions or stateful operations.

### Pattern Matching

L0172 includes pattern matching capabilities to handle different data structures and conditions.

Example Requests:
- "Match the number 1 and return 'one'."
- "Match a list and return the head."
- "Match a pair `(x, y)` and return their sum."
- "Match a record `{name, age}` and format a string."

**Capabilities**: You can match patterns in data and perform operations based on the match.  
**Limitations**: It does not support advanced pattern matching with nested structures or complex conditions.

### Mixed Programs

Combine various operations to create more complex programs that utilize multiple capabilities of L0172.

Example Requests:
- "Double numbers in `[1, 2, 3, 4]` and then sum them."
- "Square numbers from 1 to 10 and filter even results."
- "Add the elements of a pair `(3, 7)`."
- "Find the largest number in `[3, 9, 2, 7]`."

**Capabilities**: You can create programs that combine multiple operations for more complex data processing.  
**Limitations**: It cannot handle highly complex logic or operations requiring external data sources.

## Iterating and Refining

L0172 allows you to refine your requests by iterating on previous operations. You can update elements of your program to adjust the output or behavior.

Example Requests:
- "Update the list to include more elements."
- "Refine the function to handle additional cases."
- "Adjust the filter condition to exclude more values."

**Capabilities**: You can make incremental changes to your programs to refine their behavior.  
**Limitations**: It does not support dynamic updates that require re-evaluation of complex logic.

## Cross-References to Other Graffiticode Languages

For tasks that L0172 cannot perform, consider using other Graffiticode languages:

- **L0003**: For advanced data processing and complex data structures.
- **L0004**: For graphical and visual data representation.
- **L0005**: For integration with external data sources and APIs.

This guide provides an overview of what you can achieve with L0172. Use the examples as a starting point to explore the capabilities of the language through the Graffiticode MCP tool or console.