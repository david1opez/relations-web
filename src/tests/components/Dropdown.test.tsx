import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../../components/dropdown/Dropdown';

describe('Dropdown Component', () => {
  const mockProps = {
    value: 'Option 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
    onChange: jest.fn()
  };

  beforeEach(() => {
    mockProps.onChange.mockClear();
  });

  it('renders with initial value', () => {
    render(<Dropdown {...mockProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Option 1');
  });

  it('renders all options', () => {
    render(<Dropdown {...mockProps} />);
    mockProps.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onChange when selection changes', () => {
    render(<Dropdown {...mockProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Option 2' } });
    expect(mockProps.onChange).toHaveBeenCalledWith('Option 2');
  });

  it('renders down chevron icon', () => {
    render(<Dropdown {...mockProps} />);
    const icon = screen.getByRole('img', { name: 'down-chevron' });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle({ color: 'var(--color-text)' });
  });

  it('applies correct classes', () => {
    render(<Dropdown {...mockProps} />);
    const container = screen.getByRole('combobox').closest('div');
    const select = screen.getByRole('combobox');
    const icon = screen.getByRole('img', { name: 'down-chevron' });
    
    expect(container).toHaveClass('container');
    expect(select).toHaveClass('select');
    expect(icon).toHaveClass('icon');
  });

  it('handles empty options array', () => {
    render(<Dropdown {...mockProps} options={[]} />);
    const select = screen.getByRole('combobox');
    expect(select.children.length).toBe(0);
  });

  it('handles undefined options', () => {
    render(<Dropdown {...mockProps} options={undefined} />);
    const select = screen.getByRole('combobox');
    expect(select.children.length).toBe(0);
  });
}); 