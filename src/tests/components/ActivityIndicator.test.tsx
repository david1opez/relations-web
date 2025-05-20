import { render, screen } from '@testing-library/react';
import ActivityIndicator from '../../components/activityIndicator/ActivityIndicator';

describe('ActivityIndicator Component', () => {
  it('renders with default props', () => {
    render(<ActivityIndicator />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  it('applies custom color', () => {
    const color = '#ff0000';
    render(<ActivityIndicator color={color} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveStyle({ color });
  });

  it('applies custom size', () => {
    const size = '50px';
    render(<ActivityIndicator size={size} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveStyle({ width: size, height: size });
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<ActivityIndicator className={customClass} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass(customClass);
  });

  it('applies all custom props together', () => {
    const color = '#ff0000';
    const size = '50px';
    const customClass = 'custom-class';
    
    render(<ActivityIndicator color={color} size={size} className={customClass} />);
    const progress = screen.getByRole('progressbar');
    
    expect(progress).toHaveStyle({ color, width: size, height: size });
    expect(progress).toHaveClass(customClass);
  });
}); 