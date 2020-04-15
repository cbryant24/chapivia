//TODO: TEST TO MAK SURE USER NAME APPEARS IN GUESS FROM AFTER SIGNUP
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount, shallow } from "enzyme";
import { MemoryRouter } from 'react-router';

import Root from 'Root';
import Signup from 'components/Signup';
import TopMenu from 'components/TopMenu';
import Game from 'components/Game';

import { actWait } from 'utils/test/functions';
import { user } from 'utils/test/data';
import { updateComponent } from 'utils/test/functions';

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
      <MockedProvider addTypename={false}>
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

  describe('successful signup', () => {
    beforeEach(() => {
      setOrChangeNameInput();
      setOrChangeEmailInput();
      setOrChangePasswordInput();
      setOrChangeConfirmPasswordInput();
    });

    describe('before form submission', () => {
      it('can enter a name in the name input', () => {
        expect(nameInput.instance().value).toEqual('Kanye');
      });
  
      it('can enter an email in the email input', () => {
        expect(emailInput.instance().value).toEqual('kanye@west.com');
      });
  
      it('can enter a password in the password input', () => {
        expect(passwordInput.instance().value).toEqual('abc12345');
      });
  
      it('can enter a confirm password in the confirm password input', () => {
        expect(confirmPasswordInput.instance().value).toEqual('abc12345');
      });
    });

    describe('after form submission', () => {
      beforeEach( async () => {
        form.simulate('submit');

        await updateComponent(component, 5);

      });

      it('empties the name input on submit', () => {  
        expect(nameInput.instance().value).toEqual('');
      });

      it('empties the email input on submit', () => {  
        expect(emailInput.instance().value).toEqual('');
      });

      it('empties the password input on submit', () => {  
        expect(passwordInput.instance().value).toEqual('');
      });

      it('empties the confirm password input on submit', () => {  
        expect(confirmPasswordInput.instance().value).toEqual('');
      });
    });
  });

  // describe('user error signup', () => {
  //   it('has a duplicate email error', () => {

  //   });

  //   it('has mismatching passwords error', () => {

  //   });

  //   it('requires a name to signup', () => {

  //   });

  //   it('requires an properly formatted email to signup', () => {

  //   });

  //   it('requires a password to signup', () => {

  //   });

  //   it('requires a matching password and confirm password', () => {

  //   });
  // });

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