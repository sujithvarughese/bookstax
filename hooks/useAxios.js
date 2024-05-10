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

  const fetchData = async () => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})
    console.log(data)
    try {
      const response = await connect(url, { params: { data } })
      setResponse(response.data)
    } catch (error) {
      setIsError(true)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [data])

  return { data, setData, response, isLoading, isError, error }
}

export default useAxios