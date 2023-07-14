export const EmptyMessage = ({ searchFocus }) => {
  return (
    <div className="empty-message-container">
      <div className="empty-message">
        <label className="empty-message-label">
          {searchFocus ? "No search Found" : "No previous conversation found!"}
        </label>
      </div>
    </div>
  );
};
