import expect from 'expect';
import React from 'react'; // eslint-disable-line no-unused-vars
import {mount, shallow} from 'enzyme'; // eslint-disable-line no-unused-vars
import Tutorial from './Index';

/**
* @return {Func} A shallow dom for tests
*/
function setup(status) {
  let props = {
  };
  return shallow(<Tutorial {...props} />);
}

describe('<Tutorial />', () => {
  it('renders the New Tutorial component', () => {
    const wrapper = setup();

    // assertions
    expect(wrapper.find('h3').text().toLowerCase()).toContain('new proverb');
  });
});
