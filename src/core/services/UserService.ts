import { validateSession } from "../utils/supabase"

export const UserService = {
  async getUser() {
    try{
     const  user = await validateSession()
     return user
    }catch{
     return null
}
  },
}