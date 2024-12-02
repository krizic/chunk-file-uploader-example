import { type FileDescription } from '../../api';

export interface SimpleListProps {
    items: FileDescription[];
    dataKey: keyof SimpleListProps['items'][0];
    template: (item: SimpleListProps['items'][0]) => string;
}

export default function SimpleList({ items, dataKey, template }: SimpleListProps) {
    return (
        items.length > 0 && (
            <div className="mb-2">
                <ul className="flex flex-col">
                    {items.map((item) => (
                        <li
                            key={item[dataKey]}
                            className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
                        >
                            {template(item)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
}
