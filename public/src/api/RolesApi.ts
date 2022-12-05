import { endPointInterface } from "./interfaces"

export class RolesApi{



  rolesAll: string = "http://localhost:3001/rolesAll"
  roleIdURL: string = "http://localhost:3001/roleId/"
  createRoleURL: string = "http://localhost:3001/createRole"
  editRoleURL: string = "http://localhost:3001/modifyRole"
  deleteRoleURL: string = "http://localhost:3001/deleteRole"

  async obtainAll(){
    try{
      const response = await fetch(this.rolesAll)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async createRole(body){
    try{
      console.log(body)
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
      const response = await fetch(this.createRoleURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async editRole(id:string,body){
    try{
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          idRole:id,
          newRoleBody:body
        })
      }
      const response = await fetch(this.editRoleURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async roleId(id:string){
    try{
      const response = await fetch(`${this.roleIdURL}${id}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async deleteRole(id:string){
    try{
      const options = {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          idRole:id
        })
      }
      const response = await fetch(this.deleteRoleURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
}


