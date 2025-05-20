import { render, screen } from '@testing-library/react';
import MetadataItem from '@/components/metadataItem/MetadataItem';
import { IconName } from '@/types/IconTypes';

describe('MetadataItem Component', () => {
  const defaultProps = {
    icon: 'users' as IconName,
    title: 'Test Title',
    value: 'Test Value',
    className: ''
  };

  it('renders with default props', () => {
    render(<MetadataItem {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('renders icon with custom color', () => {
    const customColor = 'rgb(255, 0, 0)';
    render(<MetadataItem {...defaultProps} color={customColor} />);
    const icon = screen.getByRole('img', { name: 'users' });
    expect(icon).toHaveAttribute('style', expect.stringContaining(customColor));
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<MetadataItem {...defaultProps} className={customClass} />);
    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass(customClass);
  });
}); 