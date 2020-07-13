import React, { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const API_URL = 'https://nature-image-api.now.sh/search?q='
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value)  
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setImages([])
    const response = await fetch(`${API_URL}${searchTerm}`)
    const json = await response.json()
    setImages(json.images.map(item => <img key={item.title} src={item.image} alt={searchTerm} />))
    setLoading(false)
  }

	return (
		<div className="App">
			<h1>React Image Search</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="searchTerm">Search Term</label>
				<input
					className="u-full-width"
					type="text"
					id="searchTerm"
          name="searchTerm"
          onChange={handleChange}
				/>
				<button type="submit">Search</button>
			</form>
			{loading && <img
				id="loadingImage"
				src="https://i.imgur.com/LVHmLnb.gif"
				alt="loading..."
			/>}
			<section className="images">
        {images}
			</section>
		</div>
	)
}

export default App
