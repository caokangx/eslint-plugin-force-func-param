# eslint-plugin-force-func-param

this plugin provides a new rule which enforce every param in function must have a default value

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-force-func-param`:

```
$ npm install eslint-plugin-force-func-param --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-force-func-param` globally.

## Usage

Add `force-func-param` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "force-func-param"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "force-func-param/rule-name": 2
    }
}
```

## Supported Rules

[force-default-params](./docs/rules/force-default-params.md)




