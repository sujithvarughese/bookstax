import { useState, useEffect } from 'react'
import connect from './utils/connect'

const useLists = ({ preload , uri }) => {

  const [values, setValues] = useState({})
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)


  const getLists = async (query) => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    console.log(query)
    console.log(uri)
    setError({})
    try {
      const response = await connect(uri, { params: { query }} )
      const { lists } = response.data
      setLists(lists)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (preload === true) {
      getLists()
    }
  }, [])

  return { getLists, lists }
}

export default useLists