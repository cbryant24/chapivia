# Form Schema Validation
------------------------
This form library also performs validation on input keystroke, blur, dirty, and submit. To use in schema explicitly import patterns `{ patterns }`.

##JSON Form Schema 
------------------
Forms can be built using the schema options for each input field and button. If input validations need to be override any of the default settings or need to be set dynamically those can be done using the validation property when creating the form object. To override default values in the external form schema use the Compound Keywords `allOf` see [here](https://ajv.js.org/keywords.html#allof) for more details, also see example. To set fields use the `$data` pointer see [here](https://ajv.js.org/#data-reference) for more details, also see example

Required schema properties: `type-$string`, `name-$string`, `label-$string`
Optional schema properties: `placeholder-$string`

### Default Validations
-----------------------
`maxLength: 128`
`minLength: 1` (on form submit)

### Schema Validations
----------------------
The uri path is used in the JSON form schema $ref field for input validation. A short description and example of the validation allowed and not allowed display what can and cannot be used

#### Empty or Safe String With Spaces

uri: `patterns.json#/definitions/emptyOrSafeStringSpaces`
Description: Allows empty string, spaces, letters, numbers, and the following characters: @*!.$
Matches: '', Kanye West, a$ap Rocky, her.
Non-Matches: /Carl, 'john', George ; Michael

#### Empty or Safe String

uri: `patterns.json#/definitions/emptyOrSafeString`
Description: Allows empty string, letters, numbers, and the following characters: @*!.$
Matches: '', Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

#### Safe String

uri: `patterns.json#/definitions/safeString`
Description: Allows letters, numbers, and the following characters: @*!.$
Matches: Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

#### Safe String With Spaces

uri: `patterns.json#/definitions/safeStringSpaces`
Description: Allows spaces, letters, numbers, and the following characters: @*!.$
Matches: Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West

### <a name="setDynamically"></a>Setting validation dynamically
`
  {
    "id": "http://localhost:4001/src/schema/form.json",
    "$schema": "http://json-schema.org/draft-07/schema",
    "title": "Signup",
    "description": "User Signup",
    "type": "object",
    "properties": {
      "name": {
        "allOf": [
          { "$ref": "patterns.json#/definitions/safeStringSpaces" },
          { "maxLength": { "$data": "1/propertyName" }}
        ]
      }
    }
  }
`

## Form Schema Options
----------------------------
The form object passed must include the `name` and `cb` if the boolean for submit is true. Where `cb` refers to the callback for the form to invoke when submitted. The name should match the number provided to the validate object that is passed to the form application.


`
{
  data: [ object ] {
    name: string,
    submit: function,
    cb: function
  }
}
`

## Form Schema Input Options
----------------------------
These options available to be passed in the data field for input. The validation property can set a validation dynamically outside the JSON schema [see Dynamic Validation](#setDynamically)

### Input Data
----------------------------
Passing data for use with an input can be done using the `inputData` property in the data properties object. For select input type the `inputData` property must be present and `data` property must be type array of strings or objects. `display` is used to specify propery or value associated with data to display, if none provided data is assumed to be a string and will be used. To set the value for the input value that is returned set the `value` property on `inputData` to the property name for the input data being passed.

Required properties: `type-$string, name-$string, label-$string`
Optional properties: `placeholder-$string`
Validation options: `maxLength-$integer, minLength-$integer`

`
{
  data: [ object ] {
    type: [input | email | password | select: [{ display: string, id: string }], textarea],
    name: string,
    label: string,
    placeholder: string,
    validation: [ object ] {
      maxLength: integer,
      minLength: integer
    },
    inputData: [ object ] {
      display: string,
      initialValue: string | integer
      value: string,
      data: array
    }
  }
}
`
**Note: validation property names can be any desired name although they need to be properly referenced in the JSON schema [see Dynamic Validation](#setDynamically)**

## Formats Available
-------------------
Available format options:
* date 
* time
* date-time
* url
* email
* regex


## Custom Error Messages
------------------------
Custom error messages can be set for each input field. To set custom error messages use the keyword `errorMessage` in the JSON schema following the properties definition. The `errorMessage` properties need match the input properties set in the `properties` section

`
{
  "id": "http://localhost:4001/src/schema/form.json",
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Signup",
  "description": "User Signup",
  "type": "object",
  "properties": {
    "email": {
      "blur": {
        "$ref": "patterns.json#/definitions/emptyOrEmail"
      }
    },
    "name": {
      "type": "object",
      "properties": {
        "blur": {
          "$ref": "patterns.json#/definitions/emptyOrSafeStringSpaces"
        }
      }
    }
  },
  "errorMessage": {
    "properties": {
      "name": "Name should only contain letters, numbers",
      "email": "Email should be in email format",
    }
  }
}
`

## Submit and Cancel
--------------------

A function for submit is required and should be passed with the property name `submit` in the form data object. Optionally a cancel callback function can be passed as well to be invoked when the cancel button is clicked and will be invoked after the form values are cleared. To pass a cancel callback function use the property `cancel` on the form data object.

## Styling

This library uses `react-styled-everything` library for styling which utilizes `styled-components` and `styled-system` add css styling to elements. For a deeper look into how this styling is done see [ADD LINK TO `REACT-STYLED-EVERYTHING`] library.
to style `input` elements include on the `inputStyle` property and pass an object of camelcase css properties and values.

```javascript
inputs = [
  {
    data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
    fieldStyle: { width: [1], maxHeight: '5em', justifyContent: 'space-between', flexDirection: 'column'},
    inputStyle: {
      appearance: 'none',
      display: 'block',
      verticalAlign: 'middle',
      width: '75%',
      maxWidth: '38rem',
      color: 'white',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
      borderRadius: '5px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(221, 225, 228)',
      transition: 'box-shadow 0.125s ease-out 0s',
      margin: [1,2]
    }
  }
]
```

### Pseudo Styling

For pseudo elements and animations see [LINK TO `REACT-STYLED-EVERYTHING` USING PESUDO AND ANIMATIONS] one notiable difference is to include pseudo elements include the property `pseudo: true` to make use of pseudo elements/classes

```javascript
inputs = [
  {
    data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
    fieldStyle: { width: [1], maxHeight: '5em', justifyContent: 'space-between', flexDirection: 'column'},
    inputStyle: {
      pseudo: true,
      appearance: 'none',
      display: 'block',
      verticalAlign: 'middle',
      width: '75%',
      maxWidth: '38rem',
      color: 'white',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
      borderRadius: '5px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(221, 225, 228)',
      transition: 'box-shadow 0.125s ease-out 0s',
      margin: [1,2]
    }
  }
]
```