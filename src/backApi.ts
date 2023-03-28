
type Data = {
  name: string
}
import data from './data.json'

// mime axios.get
export const searchApi =  async (keyword: string, signal?: AbortSignal): Promise<Data[]> => {
   const resultAfterDelay = new Promise<Data[]>( (resolve, reject) => {
     if ( signal?.aborted ) {
       reject(signal.reason) 
     }
      setTimeout(() => {
        const res = data.filter(el => el.name.toLowerCase().includes(keyword.toLowerCase()))
        console.log(res)
        resolve(res) 
      }
      ,Math.random() * 1000)
     })
     return resultAfterDelay
}

