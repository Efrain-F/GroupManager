import { endPointInterface } from "./interfaces"

export class GroupApi {

  groupsAll: string = "http://localhost:3001/groupsAll"
  groupId: string = "http://localhost:3001/groupId/"
  editGroupURL: string = "http://localhost:3001/modifyGroup"
  createGroupURL: string = "http://localhost:3001/createGroup"
  deleteGroupURL: string = "http://localhost:3001/deleteGroup"
  
  
  async obtainAll(){
    try{
      const response = await fetch(this.groupsAll)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async obtainForId (id:string){
    try{
      const response = await fetch(`${this.groupId}${id}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async editGroup(id:string,body,fileImg){
    try{
      console.log(fileImg)
      let data = new FormData()
      data.append("idGroup",id)
      data.append("newGroupBody",JSON.stringify(body))
      if(fileImg){
        data.append("perfilImg",fileImg)
      }

      const options = {
        method:"POST",
        body:data
      }
      const response = await fetch(this.editGroupURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async createGroup(body){
    try{
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
      console.log(body)
      const response = await fetch(this.createGroupURL,options)
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
          idGroup:id
        })
      }
      const response = await fetch(this.deleteGroupURL,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }


}


