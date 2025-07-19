const SortList = ({ columnName, sortOrder, handleSortClick }) => {
    const ascendingButton = <button className="bg-transparent border-0 text-primary" onClick={() => handleSortClick(columnName, 1)}>▲</button>;
    const descendingButton = <button className="bg-transparent border-0 text-primary" onClick={() => handleSortClick(columnName, -1)}>▼</button>;
  
    return (
    <>
        {sortOrder === 1 ? descendingButton : ascendingButton}
    </>
    );
}

export default SortList