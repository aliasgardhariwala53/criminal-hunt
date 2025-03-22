import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySelection from '../../app/city-selection/page';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

describe('CitySelection', () => {
    it('should render the city selection form', () => {
        render(<CitySelection />);
        expect(screen.getByText('Select a City for Each Cop')).toBeInTheDocument();
        expect(screen.getByText('Cop 1')).toBeInTheDocument();
        expect(screen.getByText('Cop 2')).toBeInTheDocument();
        expect(screen.getByText('Cop 3')).toBeInTheDocument();
    });

    it('should display an error if no city is selected', async () => {
        render(<CitySelection />);
        fireEvent.submit(screen.getByRole('form'));
        const errorMessages = await screen.findAllByText('City selection is required');
        expect(errorMessages.length).toBeGreaterThan(0);
    });
});