
function FilterUser({roles,groups,filterUsers,hiddenFilter}) {

  function filter(e){
    e.preventDefault()
    let role = e.target.role.value
    let status = e.target.status.value
    let group = e.target.group.value

    // nos aseguramos que almenos tenga que filtrar algo
    if(role=="all"&&status=="all"&&group=="all"){
      hiddenFilter()
    }else{
      filterUsers({
        ...(role!="all"&&{role}),
        ...(status!="all"&&{status}),
        ...(group!="all"&&{group})
      })
    }
    
  }

  return (
    <div className="filterUser">
      <form onSubmit={filter}>
        <div className="editUser-input">
          <label>Status</label>
          <select name="status" id="">
            <option  value={"all"}>All</option>
            <option  value={"Active"}>Active</option>
            <option value={"Inactive"}>Inactive</option>
          </select>
        </div>
        <div className="editUser-input">
          <label>Groups</label>
          <select name="group" id="">
            <option  value={"all"}>All</option>
            {groups.map(group=><option  value={group.name}>{group.name}</option>)}
          </select>
        </div>
        <div className="editUser-input">
          <label>Roles</label>
          <select name="role" id="">
            <option  value={"all"}>All</option>
            {roles.map(roles=><option value={roles.name}>{roles.name}</option>)}
          </select>
        </div>
        <button type="submit" className="filter">Filter</button>
      </form>
    </div>
  );
}

export default FilterUser;