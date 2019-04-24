# Form Schema Validation
------------------------
This form library also performs validation on input keystroke, blur, dirty, and submit. To use in schema explicitly import patterns `{ patterns }`.

## Form Schema Input Options
----------------------------
Listed below are options available to be passed in the data field for input

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

##Formats Available
-------------------
Listed below are the types of format options available
* date 
* time
* date-time
* url
* email
* regex

##
Below are listed the uri path to use in the JSON form schema for each type of input validation followed by a short description and example of the validation allowed and not allowed.

### Blur Validation
------------------

#### Empty or Safe String With Spaves

uri: `patterns.json#/definitions/emptyOrSafeStringSpaces`
Description: Allows empty string, spaces, letters, numbers, and the following chars: @*!.$
Matches: '', Kanye West, a$ap Rocky, her.
Non-Matches: /Carl, 'john', George ; Michael

#### Empty or Safe String

uri: `patterns.json#/definitions/emptyOrSafeString`
Description: Allows empty string, letters, numbers, and the following chars: @*!.$
Matches: '', Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West,