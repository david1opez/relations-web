import { render, screen } from '@testing-library/react';
import MetadataItem from '../../components/metadataItem/MetadataItem';
import { IconName } from '../../types/IconTypes';

describe('MetadataItem Component', () => {
  const defaultProps = {
    icon: 'users' as IconName,
    title: 'Test Title',
    value: 'Test Value'
  };

  it('renders with default props', () => {
    render(<MetadataItem {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('renders icon with default color', () => {
    render(<MetadataItem {...defaultProps} />);
    const icon = screen.getByRole('img', { name: 'users' });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ color: 'var(--light-gray)' });
  });

  it('renders icon with custom color', () => {
    const customColor = '#ff0000';
    render(<MetadataItem {...defaultProps} color={customColor} />);
    const icon = screen.getByRole('img', { name: 'users' });
    expect(icon).toHaveStyle({ color: customColor });
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<MetadataItem {...defaultProps} className={customClass} />);
    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass(customClass);
  });

  it('renders value with correct class', () => {
    render(<MetadataItem {...defaultProps} />);
    const value = screen.getByText('Test Value');
    expect(value).toHaveClass('value');
  });

  it('renders title with correct class', () => {
    render(<MetadataItem {...defaultProps} />);
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('metadata');
  });
}); 