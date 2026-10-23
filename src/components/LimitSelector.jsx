const LimitSelector = ({ limit, setLimits }) => {
    return (
        <div className="controls">
            <label htmlFor="limit">Show:</label>
            <select id="limit" name="limit" value={limit} onChange={(e) => setLimits(Number(e.target.value))}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
}
 
export default LimitSelector;