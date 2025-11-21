import { Input } from '@/components/ui/input'
import Navbar from '@/components/ui/navbar'
import ItemsList from '@/components/view/ItemsList'
import data from '@/shared/utils/dummyData'
import useSleekStore from '@/store/Store'
import { useCallback, useEffect, useRef, useMemo, useState } from 'react'

const Home = () => {
  const updateLoggedInUser = useSleekStore((state) => state.updateLoggedInUser);
  const [searchKey, setSearchKey] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      updateLoggedInUser({ auth_token: authToken });
    }
  }, [])

  const filteredData = useMemo(() => {
    if (!searchKey.trim()) return data;
    return data.filter(item =>
      item.title.toLowerCase().startsWith(searchKey.toLowerCase())
    );
  }, [searchKey])

  const handleSearchInput = useCallback((e: any) => {
    const value = e.target.value;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setSearchKey(value);
    }, 500);
  }, [])

  const getSearchBar = () => {
    return (
      <div>
        <Input
          type="text"
          className='w-[300px]'
          onChange={handleSearchInput}
          placeholder='Search your products....'
        />
      </div>
    )
  }

  const filteredList = () => {
    return (
      <div className='bg-[#f5f5f5] absolute top-11 py-2 flex flex-col gap-2 w-[300px] max-h-[200px] overflow-auto'>
        {filteredData.map((item: any) => (
          <div key={item.id} className='bg-[#e3e3e3] gap-4 px-3 py-1 mx-[10px] rounded-md'>
            {item.title}
          </div>
        ))}
      </div>
    )
  }

  const infiniteScroll = () => {
    const [list, setList] = useState(filteredData.slice(0, 6));
    const [hasMore, setHasMore] = useState(true);

    const handleScroll = (e:any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        const nextItems = filteredData.slice(list.length, list.length + 6);
        if (nextItems.length > 0) {
          setList((prev) => [...prev, ...nextItems]);
        } else {
          setHasMore(false);
        }
      }
    };

    return (
      <div id="list-map" className='bg-[#f5f5f5] w-full self-end top-11 py-2 flex flex-col gap-2 w-[300px] max-h-[200px] overflow-auto' onScroll={handleScroll}>
        {list.map((item: any) => (
          <div key={item.id} className='bg-[#e3e3e3] gap-4 px-3 py-1 mx-[10px] rounded-md'>
            {item.title}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='p-3'>
      <Navbar />
      <div className='flex flex-col align-left my-4 gap-3 relative'>
        {getSearchBar()}
        {searchKey.trim() && filteredList()}
      </div>
      {/* {infiniteScroll()} */}
      <ItemsList />
    </div>
  )
}

export default Home