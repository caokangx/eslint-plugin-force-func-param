# Every argument in function should have a default value (force-default-params)

If you don't pass a required argument to a function, it might occur an error. By assigning default value to every argument in functions will significantly decrease the risk of occuring a error. Therefore, every parameter in functions should be assigned a default value.


## Rule Details

This rule enforce a default value for every argument in function.

This rule checks parameters in:
* function declaration
* arrow function pattern
* anonymous function

Examples of **incorrect** code for this rule:

```js

function func1 (args) { 
    return args; 
}

function func1 ({args = []}) { 
    return args; 
}

function func1 ([a] = []) { 
    return args; 
}

```

Examples of **correct** code for this rule:

```js

function func1 (args = []) { 
    return args; 
}

function func1 ({args = []} = {}) { 
    return args; 
}

function func1 ([a = 1] = []) { 
    return args; 
}

```

## When Not To Use It

this rule is for es6 and above, if your JavaScript version is less than es6, please close it.

## Further Reading

[MDN default param](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
