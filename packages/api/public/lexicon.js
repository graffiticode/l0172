export const lexicon = {
  "print": {
    "tk": 1,
    "name": "PRINT",
    "cls": "function",
    "arity": 1,
    "type": "<any: record>",
    "description": "Outputs a value to the form."
  },
  "get": {
    "tk": 1,
    "name": "GET",
    "cls": "function",
    "arity": 2,
    "type": "<tag|string|number record: any>",
    "description": "Retrieves a value from a record by key (tag, string, or number)."
  },
  "set": {
    "tk": 1,
    "name": "SET",
    "cls": "function",
    "arity": 3,
    "type": "<tag|string|number any record: record>",
    "description": "Returns a new record with the specified key updated."
  },
  "nth": {
    "tk": 1,
    "name": "NTH",
    "cls": "function",
    "arity": 2,
    "type": "<integer list: any>",
    "description": "Returns the nth element of a list by index."
  },
  "sub": {
    "tk": 1,
    "name": "SUB",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Subtracts the second number from the first."
  },
  "div": {
    "tk": 1,
    "name": "DIV",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Divides the first number by the second."
  },
  "filter": {
    "tk": 1,
    "name": "FILTER",
    "cls": "function",
    "arity": 2,
    "type": "<lambda list: list>",
    "description": "Returns a list of elements that match a predicate."
  },
  "reduce": {
    "tk": 1,
    "name": "REDUCE",
    "cls": "function",
    "arity": 3,
    "type": "<lambda any list: any>",
    "description": "Reduces a list to a single value using a binary function and initial value."
  },
  "map": {
    "tk": 1,
    "name": "MAP",
    "cls": "function",
    "arity": 2,
    "type": "<lambda list: list>",
    "description": "Applies a function to each element in a list and returns a new list."
  },
  "lt": {
    "tk": 1,
    "name": "LT",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the first value is less than the second."
  },
  "le": {
    "tk": 1,
    "name": "LE",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the first value is less than or equal to the second."
  },
  "gt": {
    "tk": 1,
    "name": "GT",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the first value is greater than the second."
  },
  "ge": {
    "tk": 1,
    "name": "GE",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the first value is greater than or equal to the second."
  },
  "ne": {
    "tk": 1,
    "name": "NE",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the two values are not equal."
  },
  "length": {
    "tk": 1,
    "name": "LENGTH",
    "cls": "function",
    "arity": 1,
    "type": "<list|string|record: integer>",
    "description": "Returns the length of a list, string, or record."
  },
  "concat": {
    "tk": 1,
    "name": "CONCAT",
    "cls": "function",
    "arity": 2,
    "type": "<string|list string|list: string|list>",
    "description": "Concatenates two strings or two lists."
  },
  "add": {
    "tk": 1,
    "name": "ADD",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Adds two numbers."
  },
  "mul": {
    "tk": 1,
    "name": "MUL",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Multiplies two numbers."
  },
  "pow": {
    "tk": 1,
    "name": "POW",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Raises the first number to the power of the second."
  },
  "apply": {
    "tk": 1,
    "name": "APPLY",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Applies a function to a list of arguments."
  },
  "data": {
    "tk": 1,
    "name": "DATA",
    "cls": "function",
    "arity": 1,
    "type": "<record: record>",
    "description": "Returns the data from the upstream task, or the argument value if no input exists."
  },
  "json": {
    "tk": 1,
    "name": "JSON",
    "cls": "function",
    "arity": 1,
    "type": "<string: any>",
    "description": "Parses a string as JSON."
  },
  "eq": {
    "tk": 1,
    "name": "EQ",
    "cls": "function",
    "arity": 2,
    "type": "<number number: boolean>",
    "description": "Returns true if the two values are equal."
  },
  "mod": {
    "tk": 1,
    "name": "MOD",
    "cls": "function",
    "arity": 2,
    "type": "<number number: integer>",
    "description": "Returns the remainder of dividing the first number by the second."
  },
  "min": {
    "tk": 1,
    "name": "MIN",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Returns the smaller of two values."
  },
  "max": {
    "tk": 1,
    "name": "MAX",
    "cls": "function",
    "arity": 2,
    "type": "<number number: number>",
    "description": "Returns the larger of two values."
  },
  "range": {
    "tk": 1,
    "name": "RANGE",
    "cls": "function",
    "arity": 3,
    "type": "<number number number: list>",
    "description": "Generates a list of numbers from start to end using a step."
  },
  "not": {
    "tk": 1,
    "name": "NOT",
    "cls": "function",
    "arity": 1,
    "type": "<boolean: boolean>",
    "description": "Returns the logical negation of a boolean value."
  },
  "equiv": {
    "tk": 1,
    "name": "EQUIV",
    "cls": "function",
    "arity": 2,
    "type": "<any any: boolean>",
    "description": "Returns true if the two values are semantically equivalent."
  },
  "or": {
    "tk": 1,
    "name": "OR",
    "cls": "function",
    "arity": 2,
    "type": "<boolean boolean: boolean>",
    "description": "Returns true if at least one of the two values is true."
  },
  "and": {
    "tk": 1,
    "name": "AND",
    "cls": "function",
    "arity": 2,
    "type": "<boolean boolean: boolean>",
    "description": "Returns true if both values are true."
  },
  "hd": {
    "tk": 1,
    "name": "HD",
    "cls": "function",
    "arity": 1,
    "type": "<list: any>",
    "description": "Returns the first element of a list."
  },
  "tl": {
    "tk": 1,
    "name": "TL",
    "cls": "function",
    "arity": 1,
    "type": "<list: list>",
    "description": "Returns the list without its first element."
  },
  "cons": {
    "tk": 1,
    "name": "CONS",
    "cls": "function",
    "length": 2,
    "arity": 2,
    "type": "<any list: list>",
    "description": "Prepends an element to the front of a list."
  },
  "append": {
    "tk": 1,
    "name": "APPEND",
    "cls": "function",
    "arity": 2,
    "type": "<any list: list>",
    "description": "Appends an element to the end of a list."
  },
  "log": {
    "tk": 1,
    "name": "LOG",
    "cls": "function",
    "arity": 1,
    "type": "<any: any>",
    "description": "Logs the value to the console and returns the value (identity function)."
  },
  "isempty": {
    "tk": 1,
    "name": "ISEMPTY",
    "cls": "function",
    "arity": 1,
    "type": "<list: boolean>",
    "description": "Returns true if the list is empty, otherwise returns false."
  },
  "last": {
    "tk": 1,
    "name": "LAST",
    "cls": "function",
    "arity": 1,
    "type": "<list: any>",
    "description": "Returns the last element of a list."
  },
  "drop": {
    "tk": 1,
    "name": "DROP",
    "cls": "function",
    "arity": 2,
    "type": "<integer list: list>",
    "description": "Returns a list with the first n elements removed."
  },
  "take": {
    "tk": 1,
    "name": "TAKE",
    "cls": "function",
    "arity": 2,
    "type": "<integer list: list>",
    "description": "Returns the first n elements of a list."
  },
  "get-var": {
    "tk": 1,
    "name": "GET_VAR",
    "cls": "function",
    "arity": 1,
    "type": "<string: any>",
    "description": "Gets the value of a named variable."
  },
  "get-val-private": {
    "tk": 1,
    "name": "GET_VAL_PRIVATE",
    "cls": "function",
    "arity": 1,
    "type": "<string: string>",
    "description": "Resolves a variable by name, encrypted at parse time and decrypted at compile time."
  },
  "get-val-public": {
    "tk": 1,
    "name": "GET_VAL_PUBLIC",
    "cls": "function",
    "arity": 1,
    "type": "<string: string>",
    "description": "Resolves a variable by name as plain text."
  },
  "set-var": {
    "tk": 1,
    "name": "SET_VAR",
    "cls": "function",
    "arity": 2,
    "type": "<string any: any>",
    "description": "Sets a named variable to a value."
  },
  "board": {
    "tk": 1,
    "name": "BOARD",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "pages": {
    "tk": 1,
    "name": "PAGES",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "page": {
    "tk": 1,
    "name": "PAGE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "nodes": {
    "tk": 1,
    "name": "NODES",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "sticky": {
    "tk": 1,
    "name": "STICKY",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "text": {
    "tk": 1,
    "name": "TEXT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "connector": {
    "tk": 1,
    "name": "CONNECTOR",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "section": {
    "tk": 1,
    "name": "SECTION",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "stamp": {
    "tk": 1,
    "name": "STAMP",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "square": {
    "tk": 1,
    "name": "SQUARE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "ellipse": {
    "tk": 1,
    "name": "ELLIPSE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "rounded-rectangle": {
    "tk": 1,
    "name": "ROUNDED_RECTANGLE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "diamond": {
    "tk": 1,
    "name": "DIAMOND",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "triangle-up": {
    "tk": 1,
    "name": "TRIANGLE_UP",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "triangle-down": {
    "tk": 1,
    "name": "TRIANGLE_DOWN",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "parallelogram-right": {
    "tk": 1,
    "name": "PARALLELOGRAM_RIGHT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "parallelogram-left": {
    "tk": 1,
    "name": "PARALLELOGRAM_LEFT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "eng-database": {
    "tk": 1,
    "name": "ENG_DATABASE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "eng-queue": {
    "tk": 1,
    "name": "ENG_QUEUE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "eng-file": {
    "tk": 1,
    "name": "ENG_FILE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "eng-folder": {
    "tk": 1,
    "name": "ENG_FOLDER",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "predefined-process": {
    "tk": 1,
    "name": "PREDEFINED_PROCESS",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "shield": {
    "tk": 1,
    "name": "SHIELD",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "document": {
    "tk": 1,
    "name": "DOCUMENT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "process": {
    "tk": 1,
    "name": "PROCESS",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "decision": {
    "tk": 1,
    "name": "DECISION",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "input-output": {
    "tk": 1,
    "name": "INPUT_OUTPUT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "terminator": {
    "tk": 1,
    "name": "TERMINATOR",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "summing-junction": {
    "tk": 1,
    "name": "SUMMING_JUNCTION",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "logic-or": {
    "tk": 1,
    "name": "LOGIC_OR",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "internal-storage": {
    "tk": 1,
    "name": "INTERNAL_STORAGE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "cloud": {
    "tk": 1,
    "name": "CLOUD",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "heart": {
    "tk": 1,
    "name": "HEART",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "trapezoid": {
    "tk": 1,
    "name": "TRAPEZOID",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "star": {
    "tk": 1,
    "name": "STAR",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "x": {
    "tk": 1,
    "name": "X",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "y": {
    "tk": 1,
    "name": "Y",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "width": {
    "tk": 1,
    "name": "WIDTH",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "height": {
    "tk": 1,
    "name": "HEIGHT",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "fill": {
    "tk": 1,
    "name": "FILL",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "stroke": {
    "tk": 1,
    "name": "STROKE",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "stroke-width": {
    "tk": 1,
    "name": "STROKE_WIDTH",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "opacity": {
    "tk": 1,
    "name": "OPACITY",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "label": {
    "tk": 1,
    "name": "LABEL",
    "cls": "function",
    "length": 2,
    "arity": 2
  },
  "color": {
    "tk": 1,
    "name": "COLOR",
    "cls": "function",
    "length": 2,
    "arity": 2
  }
}
