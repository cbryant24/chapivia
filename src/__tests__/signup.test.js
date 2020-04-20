//TODO: TEST TO MAK SURE USER NAME APPEARS IN GUESS FROM AFTER SIGNUP
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount, shallow } from "enzyme";
import { MemoryRouter } from 'react-router';

import graphqlUser from 'queries/CurrentUser';
import graphqlSignup from 'mutations/Signup';

import Root from 'Root';
import Signup from 'components/Signup';
import TopMenu from 'components/TopMenu';
import Game from 'components/Game';

import { actWait, updateComponent } from 'utils/test/functions';
// import { user } from 'utils/test/data';
// import { SIGNUP_MOCK } from 'utils/test/mocks';
import wait from 'waait';


const user = {
  id: 0,
  name: "Kanye",
  email: "kanye@west.com",
  role: 'player',
  score: 5,
  password: 'abc12345', 
  confirmPassword: 'abc12345'
};

const SIGNUP_MOCK = [
  {
    request: {
      query: graphqlSignup,
      variables: {
        // id: user.id,
        email: user.email, 
        password: user.password, 
        name: user.name
      }
    },
    result: { data: { signup: { id: user.id, name: user.name, email: user.email }}}
  },
  {
    request: {
      query: graphqlUser,
    },
    result: { data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }}}
  }
];

describe('signup', async () => {
  let component,
  nameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  form,
  setOrChangeNameInput,
  setOrChangeEmailInput,
  setOrChangePasswordInput,
  setOrChangeConfirmPasswordInput;

  beforeEach(async () => {
    component = mount(
      <MockedProvider mocks={SIGNUP_MOCK} addTypename={false}>
        <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
          <Root>
              <Signup/>
          </Root>
        </MemoryRouter>
      </MockedProvider>
    );

    // SEE THIS GITHUB ISSUE FOR EXPLANATION https://github.com/enzymejs/enzyme/issues/2073#issuecomment-531488981
    await actWait();

    // SELECTING FORM AND INPUT FIELDS
    nameInput             = component.find('input[name="name"]');
    emailInput            = component.find('input[name="email"]');
    passwordInput         = component.find('input[name="password"]');
    confirmPasswordInput  = component.find('input[name="confirm password"]');
    form                  = component.find('form#signup-form');

    //FUNCTIONS FOR CHANGING OR SETTING INPUT VALUES
    setOrChangeNameInput = name => nameInput.simulate('change',
    { 
      target: { value: name || user.name, name: 'name' }
    }),
    setOrChangeEmailInput = email => emailInput.simulate('change', 
    { 
      target: { value: email || user.email, name: 'email'},
    }),
    setOrChangePasswordInput = password => passwordInput.simulate('change', 
    { 
      target: { value: password || user.password, name: 'password'},
    }),
    setOrChangeConfirmPasswordInput = confirmPassword => confirmPasswordInput.simulate('change', 
    {
      target: { value: confirmPassword || user.confirmPassword, name: 'confirm password'}, 
    });

    expect(form.length).toEqual(1);
    expect(nameInput.length).toEqual(1);
    expect(emailInput.length).toEqual(1);
    expect(passwordInput.length).toEqual(1);
    expect(confirmPasswordInput.length).toEqual(1);
    expect(component.find('button[type="submit"]').length).toEqual(1);
    expect(component.find('div[type="cancel"]').length).toEqual(1);
  });

  // describe('successful signup', () => {
  //   beforeEach(() => {
  //     setOrChangeNameInput();
  //     setOrChangeEmailInput();
  //     setOrChangePasswordInput();
  //     setOrChangeConfirmPasswordInput();
  //   });

  //   afterEach(() => component.unmount());

  //   describe('before form submission', () => {
  //     it('can enter a name in the name input', () => {
  //       expect(nameInput.instance().value).toEqual('Kanye');
  //     });
  
  //     it('can enter an email in the email input', () => {
  //       expect(emailInput.instance().value).toEqual('kanye@west.com');
  //     });
  
  //     it('can enter a password in the password input', () => {
  //       expect(passwordInput.instance().value).toEqual('abc12345');
  //     });
  
  //     it('can enter a confirm password in the confirm password input', () => {
  //       expect(confirmPasswordInput.instance().value).toEqual('abc12345');
  //     });
  //   });

  //   describe('after form submission', () => {
  //     beforeEach( async () => {
  //       form.simulate('submit');

  //       await updateComponent(component, 5);
  //     });

  //     it('empties the name input on submit', () => {  
  //       expect(nameInput.instance().value).toEqual('');
  //     });

  //     it('empties the email input on submit', () => {  
  //       expect(emailInput.instance().value).toEqual('');
  //     });

  //     it('empties the password input on submit', () => {  
  //       expect(passwordInput.instance().value).toEqual('');
  //     });

  //     it('empties the confirm password input on submit', () => {  
  //       expect(confirmPasswordInput.instance().value).toEqual('');
  //     });
  //   });
  // });

  describe('user error signup', () => {
    beforeEach(async () => {
      component = mount(
        <MockedProvider mocks={SIGNUP_MOCK} addTypename={false}>
          <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
            <Root>
                <Signup/>
            </Root>
          </MemoryRouter>
        </MockedProvider>
      );

      // await actWait();
      await updateComponent(component, 5);


      //FUNCTIONS FOR CHANGING OR SETTING INPUT VALUES
      setOrChangeNameInput();
      setOrChangeEmailInput();
      setOrChangePasswordInput();
      setOrChangeConfirmPasswordInput();
    });

    afterEach(() => component.unmount());

    // MOCK ERRORS LOOKUP
    // it('has a duplicate email error', () => {

    // });

    it('has mismatching passwords error', async () => {
      // expect(component.find('h1').text()).toEqual('CHAPIVIA')
      // component.find('form').simulate('submit');
      // form.simulate('submit');
      // component.find('button[type="submit"]').simulate('click');
      expect(component.find('button#test-button').length).toEqual(1);
      component.find('button#test-button').simulate('click');
      // component.setProps({});
      // component.instance().forceUpdate();

      await updateComponent(component, 5);
      const hOne = component.find('h1');
      console.log(component.context())

      // component.find('h1');

      // component.instance().forceUpdate();

      // hOne.instance().forceUpdate();

      // expect(component.find('ul').length).toEqual(1);
      // console.warn(form.find('ul').debug())
      // console.log('hello world')
      // console.log(form.find('ul').debug())

      // component.setProps({});
      // component.setProps({});

      // await wait(2000);

      // expect(form.debug()).toEqual('NEW CHAPIVIA');
      expect(component.debug()).toEqual('NEW CHAPIVIA');
      // expect(component.find('h1').text()).toEqual('NEW CHAPIVIA');
      // expect(component.find('h1').text()).toEqual('NEW CHAPIVIA');
      // expect(hOne.instance()).toEqual('NEW CHAPIVIA')
      // expect(component.context()).toEqual('NEW CHAPIVIA')
    });

    // it('requires a name to signup', () => {

    // });

    // it('requires an properly formatted email to signup', () => {

    // });

    // it('requires a password to signup', () => {

    // });

    // it('requires a matching password and confirm password', () => {

    // });
  });

  // describe('network error signup', () => {
  //   it('displays an error message on network failuer', () => {

  //   });
  // });
});

// it('displays an error when an invalid character or email is used', () => {

// });

// it('clears a all form fields when canceled', () => {

// });

// it('cant sign a user up while due to invalid form data', () => {

// });

// it('can clear the form when the signup is canceled', () => {

// })

// it('cant sign a user up due to mismatching password', () => {

// })