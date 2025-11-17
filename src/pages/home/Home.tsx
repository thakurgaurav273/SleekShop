import Navbar from '@/components/ui/navbar'
import ItemsList from '@/components/view/ItemsList'
import useSleekStore from '@/store/Store'
import { useEffect } from 'react'

const Home = () => {
  const updateLoggedInUser = useSleekStore((state)=> state.updateLoggedInUser);
  useEffect(()=>{
    const authToken = localStorage.getItem('auth_token');
    if(authToken){
      updateLoggedInUser({auth_token: authToken});
    }
  },[])
  return (
    <div className='p-3'>
      <Navbar />
      <ItemsList/>
    </div>

  )
}

export default Home
