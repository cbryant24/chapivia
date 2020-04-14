import React from 'react';
import TopMenu from 'components/TopMenu';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

import { TOP_MENU_MOCKS_LOGGED_OUT, TOP_MENU_MOCKS_LOGGED_IN } from 'utilities/testMocks';
import { updateComponent } from 'utilities/testUtils';

import Root from 'Root';

describe('topMenu', () => {
  let component;

  describe('logged out', () => {
    describe('login page', () => {
      beforeEach(async () => {
        component = mount(
          <MockedProvider mocks={TOP_MENU_MOCKS_LOGGED_OUT} addTypename={false}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <Root>
                <TopMenu/>
              </Root>
            </MemoryRouter>
          </MockedProvider>
        );
  
        await updateComponent(component);
      });
  
      it('displays a link to signup', () => {
        expect(component.find('a[href="/signup"]').length).toEqual(1);
      });

      it('displays a blank trivia category', () => {
        expect(component.find('p.trivia-topic').text()).toEqual('');
      });

      it('displays a high score', () => {
        expect(component.find('p.hi-score').text()).toEqual('50,000');
      });
    });
  
    describe('signup page', () => {
      beforeEach(async () => {
        component = mount(
          <MockedProvider mocks={TOP_MENU_MOCKS_LOGGED_OUT} addTypename={false}>
            <MemoryRouter initialEntries={[{ pathname: "/signup" }]}>
              <Root>
                <TopMenu/>
              </Root>
            </MemoryRouter>
          </MockedProvider>
        );
  
        await updateComponent(component);
      });
  
      it('displays link to login', () => {
        expect(component.find('a[href="/"]').length).toEqual(1);
      });

      it('displays a blank trivia category', () => {
        expect(component.find('p.trivia-topic').text()).toEqual('');
      });

      it('displays a high score', () => {
        expect(component.find('p.hi-score').text()).toEqual('50,000');
      });
    });
  })

  
  
  describe('logged in', () => {
    let component;
    beforeEach(async () => {
      component = mount(
        <MockedProvider mocks={TOP_MENU_MOCKS_LOGGED_IN} addTypename={false}>
          <MemoryRouter initialEntries={['/game']}>
            <Root>
              <TopMenu/>
            </Root>
          </MemoryRouter>
        </MockedProvider>
      );

      await updateComponent(component);
    });

    it('displays the logged in users name', () => {
      expect(component.find('p.player-name').text()).toEqual('Kanye');
    });

    it('displays trivia category', () => {
      expect(component.find('p.trivia-topic').text()).toEqual('Entertainment: Cartoon & Animations');
    });
  
    it('displays a logout option', () => {
      expect(component.find('p.logout-player').length).toEqual(1);
    });
  
    it('logs a user out', async () => {
      component.find('p.logout-player').simulate('click');

      await updateComponent(component, 10);

      expect(component.find('p.player-name').length).toEqual(0);
      expect(component.find('p.logout-player').length).toEqual(0);
    });
  })
});
