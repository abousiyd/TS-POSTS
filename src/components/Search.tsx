interface ISearch {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ handleSearch }: ISearch): JSX.Element => {
  return (
    <section className="search">
      <input
        onChange={handleSearch}
        className="search__input"
        type="text"
        name="query"
        placeholder={`Search posts by user id, title...`}
      />
    </section>
  );
};

export default Search;
