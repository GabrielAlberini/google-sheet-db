import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse"

function App() {
  const [data, setData] = useState([])
  const [linkSelected, setLinkSelected] = useState(null)

  const getLinks = async () => {
    const res = await fetch(import.meta.env.VITE_URL_API)
    const data = await res.text()
    const parsed = await new Promise((res, rej) => {
      Papa.parse(data, {header: true, complete: res, error: rej})
    }) 
    setData(parsed.data);
  }

  useEffect(()=> {
    getLinks()
  }, [])
  
  const handleClick = (link) => {
    setLinkSelected(link)
  }
  

  const memoizedData = useMemo(() => data, [data]);
  

  return (
    <>
    <main>
      {
        memoizedData.map((link)=>{
          return (
            <div key={link.label}>
              <h1 style={{cursor:"pointer"}} onClick={() => handleClick(link)}>{link.label}</h1>
              <h2>{link.url}</h2>
            </div>
          )
        })
      }
    </main>
    {
      linkSelected && <div>
      <p>{linkSelected.url}</p>
    </div>
    }
    </>

  )
}

export default App
