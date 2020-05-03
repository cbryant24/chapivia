//TODO: TEST TO MAK SURE USER NAME APPEARS IN GUESS FROM AFTER SIGNUP
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount, shallow } from "enzyme";
import { MemoryRouter, Route } from 'react-router';
import { GraphQLError } from 'graphql';

import graphqlUser from 'queries/CurrentUser';
import graphqlSignup from 'mutations/Signup';

import Root from 'Root';
import Signup from 'components/Signup';

import { actWait, updateComponent } from 'utils/test/functions';
// import { user } from 'utils/test/data';
// import { SIGNUP_MOCK } from 'utils/test/mocks';


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
    result: { data: { user: null }}
  },
  {
    request: {
      query: graphqlUser,
    },
    result: { data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } }}
  }
];

const SIGNUP_ERROR_MOCK = [
  {
    request: {
      query: graphqlSignup,
      variables: {
        email: user.email, 
        password: user.password, 
        name: user.name
      }
    },
    result: { errors: [new GraphQLError('Error Signing Up')] }
  },
  {
    request: {
      query: graphqlUser,
    },
    result: { data: { user: null }}
  }
];

describe('signup', async () => {
  let component,
  appHistory,
  appLocation;
  
  // nameInput,
  // emailInput,
  // passwordInput,
  // confirmPasswordInput,
  // form,
  // setOrChangeNameInput,
  // setOrChangeEmailInput,
  // setOrChangePasswordInput,
  // setOrChangeConfirmPasswordInput;

  beforeEach(async () => {
    component = mount(
      <MockedProvider mocks={SIGNUP_MOCK} addTypename={false}>
        <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
          <Route
            path="*"
            render={({ history, location }) => {
              appHistory = history;
              appLocation = location;
              return null;
            }}
          />
          <Root>
              <Signup/>
          </Root>
        </MemoryRouter>
      </MockedProvider>
    );
    
      // SEE THIS GITHUB ISSUE FOR EXPLANATION https://github.com/enzymejs/enzyme/issues/2073#issuecomment-531488981
    await updateComponent(component);
  });

  describe('form fields', () => {
    afterEach(() => component.unmount());

    it('has a name input', () => {
      expect(component.find('input[name="name"]').length).toEqual(1);
    });

    it('has an email input', () => {
      expect(component.find('input[name="email"]').length).toEqual(1);
    });

    it('has a password input', () => {
      expect(component.find('input[name="password"]').length).toEqual(1);
    });

    it('has a confirm password input', () => {
      expect(component.find('input[name="confirm password"]').length).toEqual(1);
    });
  });

  describe('form inputs', () => {
    afterEach(() => component.unmount());

    it('can enter a users name in the name input', () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'Kanye', name: 'name' }
        }
      );

      expect(component.find('input[name="name"]').instance().value).toEqual('Kanye');
    });

    it('can enter a users email in the email input', () => {
      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      expect(component.find('input[name="email"]').instance().value).toEqual('kanye@west.com');
    });

    it('can enter a users password in the password input', () => {
      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      expect(component.find('input[name="password"]').instance().value).toEqual('abc12345');
    });

    it('can enter a users confirm password in the confirm password input', () => {
      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'confirm password' }
        }
      );

      expect(component.find('input[name="confirm password"]').instance().value).toEqual('abc12345');
    });

    it('clears the form inputs when the cancel button is clicked', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'Kanye', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'confirm password' }
        }
      );

      component.find('div[type="cancel"]').simulate('mousedown');

      await updateComponent(component);

      expect(component.find('input[name="name"]').instance().value).toEqual('');
      expect(component.find('input[name="email"]').instance().value).toEqual('');
      expect(component.find('input[name="password"]').instance().value).toEqual('');
      expect(component.find('input[name="confirm password"]').instance().value).toEqual('');

    });
  });

  describe('signup form submission', () => {
    beforeEach(() => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'Kanye', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'confirm password' }
        }
      );
    });

    it('clears a the name input after submission', () => {
      expect(component.find('input[name="name"]').instance().value).toEqual('Kanye');

      component.find('form#signup-form').simulate('submit');

      expect(component.find('input[name="name"]').instance().value).toEqual('');
    });

    it('clears a the email input after submission', () => {
      expect(component.find('input[name="email"]').instance().value).toEqual('kanye@west.com');

      component.find('form#signup-form').simulate('submit');

      expect(component.find('input[name="email"]').instance().value).toEqual('');
    });

    it('clears a the password input after submission', () => {
      expect(component.find('input[name="password"]').instance().value).toEqual('abc12345');

      component.find('form#signup-form').simulate('submit');

      expect(component.find('input[name="password"]').instance().value).toEqual('');
    });

    it('clears a the confirm password input after submission', () => {
      expect(component.find('input[name="confirm password"]').instance().value).toEqual('abc12345');

      component.find('form#signup-form').simulate('submit');

      expect(component.find('input[name="confirm password"]').instance().value).toEqual('');
    });

    it('submits the form and forwards the user to /game', async () => {
      component.find('form#signup-form').simulate('submit');

      await updateComponent(component);
      expect(appHistory.location.pathname).toBe('/game');
    });
  });

  describe('inputs invalid errors', () => {
    afterEach(() => component.unmount());

    it('displays an error when invalid character is used in name input', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: ';', name: 'name' }
        }
      );

      await updateComponent(component);

      expect(component.find('ul.styled-react-errors__name li').length).toEqual(1);
    });

    it('displays an error when invalid email address is used in name input', async () => {
      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye', name: 'email' }
        }
      );

      component.find('input[name="email"]').simulate('blur');
      
      await updateComponent(component);

      expect(component.find('ul.styled-react-errors__email li').length).toEqual(1);
    });

    it('displays an error when invalid character is used in password input', async () => {
      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: ';', name: 'password' }
        }
      );

      await updateComponent(component);

      expect(component.find('ul.styled-react-errors__password li').length).toEqual(1);
    });

    it('displays an error when invalid character is used in confirm password input', async () => {
      component.find('input[name="confirm password"]').simulate('change', 
      {
        target: { value: ';', name: 'confirm password'}
      });

      await updateComponent(component);

      expect(component.find('ul.styled-react-errors__confirm-password li').length).toEqual(1);
    })
  });

  describe('invalid form submissions', () => {
    it('displays form error when submitting with invalid name value', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: ';', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'confirm password' }
        }
      );

      await updateComponent(component);

      component.find('form#signup-form').simulate('submit');

      await updateComponent(component);

      // expect(component.debug()).toEqual(1);
      expect(component.find('form ul.styled-react-form-errors__signupForm li').length).toEqual(1);
    });

    it('displays form error when submitting with invalid email value', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'kanye', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'confirm password' }
        }
      );

      await updateComponent(component);

      component.find('form#signup-form').simulate('submit');

      await updateComponent(component);

      expect(component.find('form ul.styled-react-form-errors__signupForm li').length).toEqual(1);
    });

    it('displays form error when submitting with invalid password and confirm password value', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'kanye', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: ';', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: ';', name: 'confirm password' }
        }
      );

      await updateComponent(component);

      component.find('form#signup-form').simulate('submit');

      await updateComponent(component);

      expect(component.find('form ul.styled-react-form-errors__signupForm li').length).toEqual(2);
    });

    it('displays form error when submitting with mismatching password and confirm password value', async () => {
      component.find('input[name="name"]').simulate('change', 
        {
          target: { value: 'kanye', name: 'name' }
        }
      );

      component.find('input[name="email"]').simulate('change', 
        {
          target: { value: 'kanye@west.com', name: 'email' }
        }
      );

      component.find('input[name="password"]').simulate('change', 
        {
          target: { value: 'abc12345', name: 'password' }
        }
      );

      component.find('input[name="confirm password"]').simulate('change', 
        {
          target: { value: 'def67890', name: 'confirm password' }
        }
      );

      await updateComponent(component);

      component.find('form#signup-form').simulate('submit');

      await updateComponent(component);

      expect(component.find('form ul.styled-react-form-errors__signupForm li').length).toEqual(1);
    });

    describe('network errors', () => {
      beforeEach(async () => {
        component = mount(
          <MockedProvider mocks={SIGNUP_ERROR_MOCK} addTypename={false}>
            <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
              <Route
                path="*"
                render={({ history, location }) => {
                  appHistory = history;
                  appLocation = location;
                  return null;
                }}
              />
              <Root>
                  <Signup/>
              </Root>
            </MemoryRouter>
          </MockedProvider>
        );

        await updateComponent(component);
      });

      // afterEach(() => component.unmount());

      it('displays the modal with server error', async () => {
        component.find('input[name="name"]').simulate('change', 
          {
            target: { value: 'Kanye', name: 'name' }
          }
        );

        component.find('input[name="email"]').simulate('change', 
          {
            target: { value: 'kanye@west.com', name: 'email' }
          }
        );

        component.find('input[name="password"]').simulate('change', 
          {
            target: { value: 'abc12345', name: 'password' }
          }
        );

        component.find('input[name="confirm password"]').simulate('change', 
          {
            target: { value: 'abc12345', name: 'confirm password' }
          }
        );
        
        component.find('form#signup-form').simulate('submit');

        await updateComponent(component);

        expect(component.find('#chapivia-modal ul li').text().length).toBeGreaterThanOrEqual(1);
      });
    });

  });
});
