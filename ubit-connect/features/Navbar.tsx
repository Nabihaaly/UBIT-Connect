"use client"
import { useUserContext } from '@/Context/UserContext'
import EmailPassword from './EmailPassword'

const Navbar = () => {
  const user = useUserContext()
  return (
    <div>Navbar
        {user?<div>{user.id}</div> : null}
        <div>
            <EmailPassword/>
        </div>
        <p>ehello</p>
    </div>
  )
}

export default Navbar