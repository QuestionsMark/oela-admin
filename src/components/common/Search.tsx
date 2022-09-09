interface Props {
    value: string;
    handleSearch: (text: string) => void;
}

export const Search = ({ handleSearch, value }: Props) => {
    return (
        <input type="text" className="form__search" placeholder="Szukaj" value={value} onChange={e => handleSearch(e.target.value)} />
    );
};