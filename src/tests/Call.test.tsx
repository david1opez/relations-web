import { render } from '@testing-library/react';
import Call from '@/components/call/Call';

describe('Call Component', () => {
    it('should render without crashing', () => {
        const { container } = render(<Call />);
        expect(container).toBeInTheDocument();
    });
});