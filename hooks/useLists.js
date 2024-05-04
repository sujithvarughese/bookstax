import { useState, useEffect } from 'react'
import connect from '../utils/connect'
import axios from 'axios'

const useLists = ({ method , url }) => {

  const [data, setData] = useState({})
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)


  const getLists = async () => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})

    try {
      const response = await connect(url, { method: method, params: data })

      const { lists } = response.data
      setLists(lists)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getLists()
  }, [data])

  return { setData, lists }
}

export default useLists