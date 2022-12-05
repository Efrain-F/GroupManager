

import { endPointInterface } from "./interfaces"

export class UsuarioApi{

  private usersAll: string = "http://localhost:3001/usersAll"
  private userId: string = "http://localhost:3001/userId/"
  private activitesUser: string = "http://localhost:3001/activitieUser/"
  private deleteUser: string = "http://localhost:3001/deleteUser"
  private deleteListUsers: string = "http://localhost:3001/deleteListUsers"
  private editUserURL: string = "http://localhost:3001/modifyUser"
  private createUserURL: string = "http://localhost:3001/createUser"
  private freeUsersURL: string = "http://localhost:3001/freeUsers"
  


  async obtainAll(){
    try{
      const response = await fetch(this.usersAll)
      const result = await response.json()
      if (response.status !==200)throw result;
      result.map(user=>{
        if(!user.Role){
          user.Role = {
            color:"#212121",
            name:"None"
          }
        }
      })
      return result
    }catch(err){
      throw err
    }
  }
  async obtainForId(id:String){
    try{
      const response = await fetch(`${this.userId}${id}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      if(!result.Role){
        result.Role = {
          color:"#212121",
          name:"None"
        }
      }
      return result
    }catch(err){
      throw err
    }
  }
  async obtainFreeUser(){
    try{
      
      const response = await fetch(`${this.freeUsersURL}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async obtainActivities(id:String){
    try{
      
      const response = await fetch(`${this.activitesUser}${id}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async deleteForId(id:String){
    try{
      console.log(id)
      const options = {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          idUser:id
        })
      }
      const response = await fetch(this.deleteUser,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }

  async editUser(id:string,body,fileImg){
    try{
      let data = new FormData()
      data.append("idUser",id)
      data.append("newUserBody",JSON.stringify(body))
      if(fileImg){
        data.append("perfilImg",fileImg)
      }

      const options = {
        method:"POST",
        body:data
      }
      const response = await fetch(this.editUserURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async createUser(body){
    try{
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
      const response = await fetch(this.createUserURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async deleteListIds(listIds){
    try{
      const options = {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ids:listIds
        })
      }
      const response = await fetch(this.deleteListUsers,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
}


