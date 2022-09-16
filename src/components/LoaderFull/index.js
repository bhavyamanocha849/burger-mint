import React from 'react'
import Loading from '../Loader'
import './index.css'

const LoaderFull = ({
  content,
  isLoading
}) => {
  if(isLoading)
  return (
    <div className='loader-full-container'>
        <Loading />
        <p>{content}</p>
    </div>
  )
}

export default LoaderFull