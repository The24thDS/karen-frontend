import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from 'components/form/inputs/SubmitButton';

const fakeProps = {
  text: 'submit',
};

describe('<SubmitButton />', () => {
  it('renders the button with the passed text', async () => {
    render(<SubmitButton {...fakeProps} />);
    expect(screen.getByRole('button')).toHaveValue(fakeProps.text);
  });
});
