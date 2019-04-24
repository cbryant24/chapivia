# Form Schema Validation
------------------------
This form library also performs validation on input keystroke, blur, dirty, and submit. To use in schema explicitly import patterns `{ patterns }`.

## Form Schema Options
----------------------
Character Length Restrictions: Use the properties `maxLength` or `minLength` to restrict character limit for a field input


##
Below are listed the uri path to use in the JSON form schema for each type of input validation followed by a short description and example of the validation allowed and not allowed.

### Blur Validation
------------------

#### Empty or Safe String With Spaves

uri: `patterns.json#/definitions/blur/emptyOrSafeStringSpaces`
Description: Allows empty string, spaces, letters, numbers, and the following chars: @*!.$
Matches: '', Kanye West, a$ap Rocky, her.
Non-Matches: /Carl, 'john', George ; Michael

#### Empty or Safe String

uri: `patterns.json#/definitions/blur/emptyOrSafeString`
Description: Allows empty string, letters, numbers, and the following chars: @*!.$
Matches: '', Kanye, a$ap, her.
Non-Matches: /Carl, 'john', Kanye West,