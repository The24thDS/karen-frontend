import React from 'react';
import { render, screen } from '@testing-library/react';
import Textarea from 'components/form/textarea/Textarea';

const fakeProps = {
  id: 'fake',
  label: 'Textarea',
};

describe('<Textarea />', () => {
  it('renders without errors', async () => {
    render(<Textarea {...fakeProps} />);
    expect(screen.getByLabelText(fakeProps.label)).toBeVisible();
  });
  it('renders the error message', async () => {
    const localFakeProps = {
      ...fakeProps,
      errors: {
        message: 'This is an error',
      },
    };
    render(<Textarea {...localFakeProps} />);
    expect(screen.getByText(localFakeProps.errors.message)).toBeVisible();
  });
});
