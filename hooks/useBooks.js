import { useState, useEffect } from 'react'
import connect from '../utils/connect'
import axios from 'axios'

const useBooks = ({ method , url }) => {

  const [data, setData] = useState("")
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)


  const getBooks = async () => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})

    try {
      const response = await connect(url)
      const { books } = response.data
      setBooks(books)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getBooks()
  }, [data])

  return { setData, books }
}

export default useBooks