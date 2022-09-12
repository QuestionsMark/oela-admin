import { ReactElement } from "react";

interface Props {
    limit: number;
    items: ReactElement[];
}

export const List = ({ limit, items }: Props) => {

    // Może jakaś funkcja rekurencyjna?
    const sectionList = () => {
        const groups = [];
        let group = [];
        for (const item of items) {
            group.push(item);
            if (group.length === limit) {
                groups.push(group);
                group = [];
            }
        }
        if (group.length !== 0) {
            groups.push(group);
        }
        return groups.map((g, i) => <div key={String(i)} className="list__section">{g}</div>);
    };

    return (
        <ul className="list">
            {sectionList()}
        </ul>
    );
};