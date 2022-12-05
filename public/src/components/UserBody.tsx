import UserActivity from "./UserActivity";
import { Link } from "react-router-dom";
function UserBody({userBody,activities}) {

  return (
    <section>
        <div className="user-head">
          <img src="http://localhost:3001/user/fondo.jpg" className="user-head-fondo" />
          <div className="user-head-describ">
            <img src={"http://localhost:3001/user/"+userBody.perfilImg} />
            <div className="user-head-describ-inf">
              <div className="user-head-describ-inf-name">
                <h3>{userBody.name}</h3>
                <span>{userBody.email}</span>
              </div>
              <Link to={"/editUser/"+userBody.id}>Edit profile</Link>
            </div>
          </div>
        </div>
        <section className="user-body">
          <div className="user-body-info">
            <div className="user-body-info-details">
              <h4>Details</h4>
              <ul className="user-body-info-details-list">
                <li className="user-body-info-details-list-item">
                  <h5>Rol</h5>
                  <span>{userBody.role}</span>
                </li>
                <li className="user-body-info-details-list-item">
                  <h5>Status</h5>
                  <span>{userBody.status}</span>
                </li>
                {
                  userBody.group?(
                  <li className="user-body-info-details-list-item">
                    <h5>Group</h5>
                    <span>{userBody.group}</span>
                  </li>
                  ):(
                    <li className="user-body-info-details-list-item">
                    <h5>Group</h5>
                    <span>Libre</span>
                    </li>
                  )
                }
                <li className="user-body-info-details-list-item">
                    <h5>Name</h5>
                    <span>{userBody.name}</span>
                </li>
                <li className="user-body-info-details-list-item">
                  <h5>Email</h5>
                  <span>{userBody.email}</span>
                </li>
                <li className="user-body-info-details-list-item">
                  <h5>Location</h5>
                  <span>{userBody.location}</span>
                </li>
                <li className="user-body-info-details-list-item">
                  <h5>Phone number</h5>
                  <span>{userBody.phoneNumber}</span>
                </li>
              </ul>
            </div>
            
            <div className="user-body-info-text">
              <h4>Info</h4>
              <p>{userBody.info}</p>
            </div>
          </div>
          
          

          <section>
            <div className="user-body-activity">
            {activities.length?(
              <>
              <h4>Actividades</h4>
              <ul className="user-body-activity-list">
                {activities.map(activity=><UserActivity activity={activity}/>)}
                
              </ul>
              </>
            ):undefined}
            </div>
          </section>
        </section>
    </section>
  );
}

export default UserBody;