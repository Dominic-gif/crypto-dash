const SortSelector = ({ sortBy, setSortBy }) => {
    return (
        <div className="controls">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="market_cap_desc">Market Cap (High To Low)</option>
                <option value="market_cap_asc">Market Cap (Low To High)</option>
                <option value="price_desc">Price (High To Low)</option>
                <option value="price_asc">Price (Low To High)</option>
                
                <option value="change_desc">Change (High To Low)</option>
                <option value="change_asc">Change (Low To High)</option>
            </select>
        </div> 
    );
}

export default SortSelector;
