import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@testing-library/jest-dom';

import SimpleList, { type SimpleListProps } from './SimpleList';
const items = [
    { size: 1, name: 'File 1' },
    { size: 2, name: 'File 2' },
];

const template = (item: { size: number; name: string }) => item.name;

describe('SimpleList', () => {
    const props: SimpleListProps = {
        items,
        dataKey: 'name',
        template,
    };

    it('renders without crashing', () => {
        const { container } = render(<SimpleList {...props} />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of items', () => {
        const { getAllByRole } = render(<SimpleList {...props} />);
        const listItems = getAllByRole('listitem');
        expect(listItems).toHaveLength(items.length);
    });

    it('renders the correct content for each item', () => {
        const { getByText } = render(<SimpleList {...props} />);
        for (const item of items) {
            expect(getByText(item.name)).toBeInTheDocument();
        }
    });

    it('does not render when items array is empty', () => {
        const emptyProps = { ...props, items: [] };
        const { container } = render(<SimpleList {...emptyProps} />);
        expect(container.firstChild).toBeNull();
    });
});
