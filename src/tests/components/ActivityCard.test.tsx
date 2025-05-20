import { render, screen } from '@testing-library/react';
import ActivityCard from '../../components/activityCard/ActivityCard';

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('ActivityCard Component', () => {
  const defaultProps = {
    icon: '/test-icon.png',
    title: 'Test Activity',
    number: 42
  };

  it('renders with all props', () => {
    render(<ActivityCard {...defaultProps} />);
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByAltText('House')).toHaveAttribute('src', '/test-icon.png');
  });

  it('renders without number', () => {
    render(<ActivityCard icon={defaultProps.icon} title={defaultProps.title} />);
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.queryByText('42')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with correct image attributes', () => {
    render(<ActivityCard {...defaultProps} />);
    const image = screen.getByAltText('House');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
    expect(image).toHaveClass('activityCardIcon');
  });

  it('renders with correct title class', () => {
    render(<ActivityCard {...defaultProps} />);
    const title = screen.getByText('Test Activity');
    expect(title).toHaveClass('activityCardTitle');
  });

  it('renders with correct number class', () => {
    render(<ActivityCard {...defaultProps} />);
    const number = screen.getByText('42');
    expect(number).toHaveClass('activityCardNumber');
  });

  it('shows loading indicator with correct color', () => {
    render(<ActivityCard icon={defaultProps.icon} title={defaultProps.title} />);
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveStyle({ color: 'var(--light-gray)' });
  });
}); 