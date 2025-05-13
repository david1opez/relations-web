import { render } from '@testing-library/react';
import ResourceCard from '@/components/resourceCard/ResourceCard';

describe('ResourceCard Component', () => {
    it('should render without crashing', () => {
        const { container } = render(<ResourceCard />);
        expect(container).toBeInTheDocument();
    });
});