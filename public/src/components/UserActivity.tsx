
function UserActivity({activity}) {
  return (
    <li>
      <div className="user-body-activity-list-name">
        <h5>{activity.name}</h5>
        <p>{activity.describ}</p>
      </div>
      <div className="user-body-activity-list-details">
        <span className="user-body-activity-list-item">
          {activity.Group.name}
        </span>
        <span className="user-body-activity-list-item">
          {activity.status}
        </span>
      </div>
    </li>
  );
}

export default UserActivity;