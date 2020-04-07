//TODO: TEST TO MAK SURE USER NAME APPEARS IN GUESS FROM AFTER SIGNUP
import React from 'react';
import { mount } from "enzyme";

import Root from 'Root';
import Signup from 'components/'

it('can sign a user up and direct user to game after signup', () => {
  const component = mount(<Root><Signup/></Root>);

  expect(component.find('li').length).toEqual(4);


});

it('cant sign a user up while due to invalid form data', () => {

});
