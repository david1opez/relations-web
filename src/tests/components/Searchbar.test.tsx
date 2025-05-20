import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from '@/components/searchbar/Searchbar';

describe('Searchbar Component', () => {
  it('renders search input', () => {
    render(<Searchbar />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<Searchbar />);
    const iconElement = screen.getByRole('img', { name: 'search' });
    expect(iconElement).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(<Searchbar onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('renders with initial value', () => {
    render(<Searchbar value="initial value" />);
    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });
}); 