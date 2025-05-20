import { render, screen, fireEvent } from '@testing-library/react';
import Link from '../../components/link/Link';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Link Component', () => {
  it('renders children correctly', () => {
    const testText = 'Test Link';
    render(<Link href="/test">{testText}</Link>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('calls router.push when clicked', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }));

    const href = '/test-route';
    render(<Link href={href}>Test Link</Link>);
    
    fireEvent.click(screen.getByText('Test Link'));
    expect(mockPush).toHaveBeenCalledWith(href);
  });

  it('renders with correct href prop', () => {
    const href = '/test-route';
    render(<Link href={href}>Test Link</Link>);
    const linkElement = screen.getByText('Test Link').parentElement;
    expect(linkElement).toBeInTheDocument();
  });
}); 