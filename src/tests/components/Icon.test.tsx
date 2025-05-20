import { render, screen, fireEvent } from '@testing-library/react';
import Icon from '../../components/icon/Icon';

// Mock del archivo icons.json
jest.mock('../../components/icon/icons.json', () => ({
  search: {
    viewbox: '0 0 24 24',
    paths: [
      {
        d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        stroke: '#000',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }
    ]
  }
}));

describe('Icon Component', () => {
  it('renders icon with correct attributes', () => {
    render(<Icon name="search" size={24} color="#000" />);
    const svgElement = screen.getByRole('img', { name: 'search' });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Icon name="search" size={24} onClick={handleClick} />);
    const svgElement = screen.getByRole('img', { name: 'search' });
    
    fireEvent.click(svgElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles mouse events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <Icon 
        name="search" 
        size={24} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
    const svgElement = screen.getByRole('img', { name: 'search' });
    
    fireEvent.mouseEnter(svgElement);
    expect(handleMouseEnter).toHaveBeenCalled();
    
    fireEvent.mouseLeave(svgElement);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = { opacity: 0.5 };
    render(<Icon name="search" size={24} style={customStyle} />);
    const svgElement = screen.getByRole('img', { name: 'search' });
    expect(svgElement).toHaveStyle({ opacity: 0.5 });
  });

  it('returns null for non-existent icon', () => {
    const { container } = render(<Icon name="nonExistentIcon" size={24} />);
    expect(container.firstChild).toBeNull();
  });
}); 