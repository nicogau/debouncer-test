import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { searchApi } from './backApi'

function useDebounceQuery (value: string, time = 250) {
  const [debounceQuery, setDebounceQuery] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => { setDebounceQuery(value)}, time)
    return () => {clearTimeout(timeout)}
  }, [value, time])
  return debounceQuery
}

function App() {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>("")
  const debounceQuery = useDebounceQuery(keyword) 

useEffect( () => {
    let ignore = false
    const controller = new  AbortController()
    const signal = controller.signal
    ;(async () => {
      setSuggestions([])
      if (keyword) {
        const data = await searchApi(debounceQuery, signal)
        !ignore && setSuggestions(data as any[])
      }
    })()

    return () => {
      console.log('inside return func')
      ignore = true
      }
    // let filterTimeout = setTimeout(() => {
    //   searchApi(keyword).then(res => setData((res as any[])))
    // }, 200)
    // return () => clearTimeout(filterTimeout)
  }, [debounceQuery])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setKeyword(e.target.value)
  }

  return (
    <div className="App">
      {/* form */}
      <div>
        <input 
          type="text"
          onChange={handleSearch}
          />
        <button>envoyer</button>
      </div>
      {/* data list */}
        <div>
          <ul>
            { suggestions.map( (el, index) => 
              <li key={index}>{el.name}</li>
            )}
          </ul>
        </div>
    </div>
  )
}

export default App
