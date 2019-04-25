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

## Form Schema Input Options
----------------------------
These options available to be passed in the data field for input. The validation property can set a validation dynamically outside the JSON schema [see Dynamic Validation](#setDynamically)

Required properties: `type-$string, name-$string, label-$string`
Optional properties: `placeholder-$string`
Validation options: `maxLength-$integer, minLength-$integer`

`
{
  data: [ object ] {
    type: [input, email, password, selection],
    name: string,
    label: string,
    placeholder: string,
    validation: [ object ] {
      maxLength: integer,
      minLength: integer
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