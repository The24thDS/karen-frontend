import { render, screen } from '@testing-library/react';
import DownloadButton from 'components/download-button/DownloadButton';
import React from 'react';

const fakeProps = {
  link: 'http://site.link',
};

describe('<Download Button />', () => {
  it('renders a link with the passed value as href', async () => {
    render(<DownloadButton {...fakeProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', fakeProps.link);
  });
  it("doesn't show a size badge if a size prop is not passed", async () => {
    render(<DownloadButton {...fakeProps} />);
    expect(screen.queryByLabelText('size')).toBeNull();
  });
  it('shows a size badge if a size prop is passed', async () => {
    const localFakeProps = {
      ...fakeProps,
      size: '25MB',
    };
    render(<DownloadButton {...localFakeProps} />);
    expect(screen.queryByLabelText('size')).not.toBeNull();
    expect(screen.getByLabelText('size')).toHaveTextContent(
      localFakeProps.size
    );
  });
});
