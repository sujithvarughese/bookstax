import { useState, useEffect } from 'react'
import connect from '../utils/connect'
import axios from 'axios'

const endpoints = {
  library: "/library",
  current: "/current",
  discover: "/discover/bestsellers",
  search: "/discover/search"
}

const useAxios = ({ url, method }) => {

  const [data, setData] = useState("")
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)


  const fetchData = async () => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})
    try {
      console.log(url)
      console.log(data)
      const response = await connect(url, { params: { data } })
      setResponse(response.data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [data])

  return { setData, response }
}

export default useAxios