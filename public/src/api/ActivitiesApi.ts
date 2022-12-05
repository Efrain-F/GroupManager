import { endPointInterface } from "./interfaces"

export class ActivitiesApi implements endPointInterface{



  endPoint: string = "http://localhost:3001/users"
  createURl: string = "http://localhost:3001/createActivities"
  activityIDURl: string = "http://localhost:3001/activitie/"

  modifyURl: string = "http://localhost:3001/modifyActivitie"
  deleteURl: string = "http://localhost:3001/deleteActivities"
  
  async obtainAll(){
    try{
      const response = await fetch(this.endPoint)
      const result = await response.json()
      console.log(result)
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async obtainForId(id){
    try{
      const response = await fetch(`${this.activityIDURl}${id}`)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async create(body){
    try{
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
      const response = await fetch(this.createURl,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async edit(body){
    try{
      const options = {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
      const response = await fetch(this.modifyURl,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
  async delete(id){
    try{
      console.log(id)
      const options = {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({idActivity:id})
      }
      const response = await fetch(this.deleteURl,options)
      const result = await response.json()
      if (response.status !==200)throw result;
      return result
    }catch(err){
      throw err
    }
  }
}


