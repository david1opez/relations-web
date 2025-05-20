import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from '../../components/searchbar/Searchbar';

describe('Searchbar Component', () => {
  it('renders searchbar with placeholder', () => {
    render(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Buscar...');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays initial value when provided', () => {
    const initialValue = 'test search';
    render(<Searchbar value={initialValue} />);
    const inputElement = screen.getByDisplayValue(initialValue);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<Searchbar onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText('Buscar...');
    
    fireEvent.change(inputElement, { target: { value: 'new search' } });
    
    expect(handleChange).toHaveBeenCalledWith('new search');
  });

  it('renders search icon', () => {
    render(<Searchbar />);
    const iconElement = screen.getByTestId('icon-search');
    expect(iconElement).toBeInTheDocument();
  });
}); 