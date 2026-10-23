const FilterInput = ({ filter, setFilter }) => {
    return (
        <div className="filter">
            <input type="text" value={filter} placeholder='Filter coins or symbols...' onChange={(e) => setFilter(e.target.value)} />
        </div>
    );
}

export default FilterInput;
