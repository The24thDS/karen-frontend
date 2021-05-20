import React from 'react';
import { render, screen } from '@testing-library/react';
import FileInput from 'components/form/inputs/FileInput';

const fakeProps = {
  id: 'fake',
  label: 'Files',
};

describe('<FileInput />', () => {
  it('renders the file input', async () => {
    render(<FileInput {...fakeProps} />);
    expect(screen.getByLabelText(fakeProps.label)).toBeInTheDocument();
  });
  it('renders error message', async () => {
    const localFakeProps = {
      ...fakeProps,
      errors: {
        message: 'This is an error',
      },
    };
    render(<FileInput {...localFakeProps} />);
    expect(screen.getByText(localFakeProps.errors.message)).toBeVisible();
  });
  it('calls the renderErrors function if one was passed', async () => {
    const localFakeProps = {
      ...fakeProps,
      errors: {
        message: 'This is an error',
      },
      renderErrors: jest.fn(),
    };
    render(<FileInput {...localFakeProps} />);
    expect(localFakeProps.renderErrors).toHaveBeenCalledWith(
      localFakeProps.errors
    );
  });
});
