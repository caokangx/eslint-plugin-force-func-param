/**
 * @fileoverview force every argument in function has a default value
 * @author Cao Kang
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/force-default-params"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

const valid = [
    "function func1 () { return; }",
    "function func1 (args = []) { return args; }",
    "function func1 (args = 1) { return args; }",
    "function func1 (args = x + 1) { return args; }",
    "function func1 (args = x + 1, ...restArgs) { return args; }",
    "function func1 (args = 1) { args = []; return args; }",
    "function func1 (args = [], exArgs = false) { args = 1; exArgs = 2; return args; }",
    "function func1 (args = [], exArgs = {}) { return args; }",
    "function func1 (args = [], exArgs = 'str') { return args; }",
    "function func1 ([a = false] = [], ...restArgs) { return args; }",
    "function func1 ([a = 1, ...b] = [], ...restArgs) { return args; }",
    "function func1 ([a = 1, b = false,c = 'str'] = [], ...restArgs) { return args; }",
    "function func1 ({args = x + 1} = {}) { return args; }",
    "function func1 ({args: {x = 1} = {}} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}, exArgs = 'str'} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}, exArgs = 0} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}, exArgs = false} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}, exArgs = {}} = {}) { return args; }",
    "function func1 ({args: {x: y = 1} = {}, exArgs: exArgsVal = {x: y = 1}} = {}) { return args; }",
    "function func1 ([{ x: y = 1} = {}, ...b] = [], ...restArgs) { return args; }",
    "function func1 ([{ x: y = 1} = {}, c = false, ...b] = [], d = 'str', ...restArgs) { return args; }",
    "(args = []) => { return args; }",
    "(args = []) => args",
    "(args = x + 1) => args",
    "(args = false) => args",
    "({args = x + 1} = {}) => args",
    "(args = [], exArgs = false) => args",
    "(args = [], exArgs = 0) => args",
    "(args = [], exArgs = []) => args",
    "(args = {}, exArgs = []) => args",
    "({args: {x = 1} = {}} = {}) => args",
    "({args: {x: y = 1} = {}} = {}) => args",
    "({args: {x: y = 1} = {}, exArgs = 'str'} = {}) => args",
    "({args: {x: y = 1} = {}, exArgs = false} = {}) => args",
    "({args: {x: y = 1} = {}, exArgs = 0} = {}) => args",
    "({args: {x: y = 1} = {}, exArgs = {}} = {}) => args",
    "({args: {x: y = 1} = {}, exArgs: exArgsVal = {x: y = 1}} = {}) => args",
    "const func = function func1 (args = []) { return args; }",
    "const func = function func1 (args = [], exArgs = {}) { return args; }",
    "const func = function func1 ({args: {x = 1} = {}} = {}) { return args; }",
    "const func = function func1 ({args: {x: y = 1} = {}, exArgs: exArgsVal = {x: y = 1}} = {}) { return args; }",
    "const func = function ({args: {x: y = 1} = {}, exArgs: exArgsVal = {x: y = 1}} = {}) { return args; }",
    "const obj = {func: (args = []) => { return args; }}",
    "const obj = {func (args = []) { return args; }}",
    "class Class1 {func(args = []){ return args; }}"
];
const invalid = [
    {
        code: "function func1(args) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "function func1(args, exArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "function func1(args, exArgs, ...restArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "function func1 ({args = []}) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            }
        ]
    },
    {
        code: "function func1 ({args}) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            }
        ]
    },
    {
        code: "function func1 ({args = x + 1}) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            }
        ]
    },
    {
        code: "function func1 ({args: {x} = {}} = {}) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "Property"
            }
        ]
    },
    {
        code: "function func1 ({args: {x: y}}) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            }
        ]
    },
    {
        code: "function func1 ([a]) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "function func1 ([a, {b}]) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            },
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            }
        ]
    },
    {
        code: "function func1 ([a], {args: {x: y = 'str'} = {}} = {}, ...restArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "function func1 ([a, ...restArgsInArray], {args: {x: y = 'str'} = {}} = {}, ...restArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "const func = function func1 ([a, ...restArgsInArray], {args: {x: y = 'str'} = {}} = {}, ...restArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "const func = function ([a, ...restArgsInArray], {args: {x: y = 'str'} = {}} = {}, ...restArgs) { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "([a, ...restArgsInArray], {args: {x: y = 'str'} = {}} = {}, ...restArgs) => { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            }
        ]
    },
    {
        code: "([a, ...restArgsInArray], {args: {x: y}}, ...restArgs) => { return args; }",
        errors: [
            {
                messageId: "missDefaultValue",
                type: "ArrayPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Identifier"
            },
            {
                messageId: "missDefaultValue",
                type: "ObjectPattern"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            },
            {
                messageId: "missDefaultValue",
                type: "Property"
            }
        ]
    }
];

ruleTester.run("force-default-params", rule, {
    valid,
    invalid
});
