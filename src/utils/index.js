import {
  user,
  actWait,
  updateComponent
} from './test/functions';
import { SIGNUP_MOCK, 
  CURRENT_USER_MOCK, 
  LOGIN_MOCK, 
  TOP_MENU_MOCKS_LOGGED_OUT, 
  TOP_MENU_MOCKS_LOGGED_IN
} from './test/mocks';


export default {
  ...SIGNUP_MOCK, 
  ...CURRENT_USER_MOCK, 
  ...LOGIN_MOCK, 
  ...TOP_MENU_MOCKS_LOGGED_OUT, 
  ...TOP_MENU_MOCKS_LOGGED_IN,
  ...user
}
