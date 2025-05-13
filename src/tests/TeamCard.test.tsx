import { render } from '@testing-library/react';
import TeamCard from '@/components/teamCard/TeamCard';

describe('TeamCard Component', () => {
    it('should render without crashing', () => {
        const { container } = render(<TeamCard />);
        expect(container).toBeInTheDocument();
    });
});