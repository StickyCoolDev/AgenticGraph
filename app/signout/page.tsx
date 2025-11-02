'use client';
import {Logout} from '@/lib/handleAuth';

export default function Page() {

  const handleLogout = async () => {
    await Logout();
  }


  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

