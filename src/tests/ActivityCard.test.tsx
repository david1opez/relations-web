import { render, screen } from '@testing-library/react';
import ActivityCard from '@/components/activityCard/ActivityCard';

import '@testing-library/jest-dom'

describe('ActivityCard Component', () => {
    it('renders the ActivityCard with title and number', () => {
        render(<ActivityCard icon="/path/to/icon.svg" title="Test Title" number={42} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders the ActivityCard with ActivityIndicator when number is not provided', () => {
        render(<ActivityCard icon="/path/to/icon.svg" title="Test Title" />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});