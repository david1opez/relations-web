import { render, screen } from '@testing-library/react';
import ResourceCard from '@/components/resourceCard/ResourceCard';

describe('ResourceCard Component', () => {
  it('renders ResourceCard text', () => {
    render(<ResourceCard />);
    expect(screen.getByText('ResourceCard')).toBeInTheDocument();
  });

  it('renders with correct container class', () => {
    render(<ResourceCard />);
    const container = screen.getByText('ResourceCard').parentElement;
    expect(container).toHaveClass('container');
  });
}); 