import React from 'react';
import { render, screen } from '@testing-library/react';
import DaySection from './DaySection';
import { MockedProvider } from '@apollo/client/testing';

test('renders time of day header', () => {
    render(
        <>
            <MockedProvider mocks={[]} addTypename={false}>
                <DaySection timeOfDay='Morning' className='wb_sunny' />
            </MockedProvider>
        </>
    );
    const morningElement = screen.getByText(/Morning/i);
    expect(morningElement).toBeInTheDocument();
});
