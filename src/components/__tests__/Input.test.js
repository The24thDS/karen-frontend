import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from 'components/form/inputs/Input';

const fakeProps = {
  id: 'fake',
};

describe('<Input />', () => {
  it('defaults to a text input', async () => {
    render(<Input {...fakeProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });
  it('renders an input of the passed type', async () => {
    const localFakeProps = {
      ...fakeProps,
      type: 'password',
      label: 'fake',
    };
    render(<Input {...localFakeProps} />);
    expect(screen.getByLabelText('fake')).toHaveAttribute(
      'type',
      localFakeProps.type
    );
  });
  it('renders the error message', async () => {
    const localFakeProps = {
      ...fakeProps,
      errors: {
        message: 'This is an error',
      },
    };
    render(<Input {...localFakeProps} />);
    expect(screen.getByText(localFakeProps.errors.message)).toBeVisible();
  });
});
