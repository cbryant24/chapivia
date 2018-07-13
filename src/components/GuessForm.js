import React, { Component } from 'react';
import { GridItem, Field, OutlineButton } from './elements';

class GuessForm extends Component {
  render() {
    return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <Field 
          name="select"
          type="select"
          label="Player"
          error="can’t be blank"
        >
          <option value="ross">Ross</option>
          <option value="roe">Roe</option>
          <option value="chris">Chris</option>
        </Field>
        <Field 
          name="password"
          type="password"
          label="Password"
          error="can’t be blank"
        >
        </Field>
        <OutlineButton
          color="white"
          borderColor='primary'
          mt="1rem"
        >
          Submit
        </OutlineButton>
        <OutlineButton
          color="white"
          borderColor='primary'
          mt="1rem"
        >
          Cancel
        </OutlineButton>
      </GridItem>
    );
  }
}

export default GuessForm;