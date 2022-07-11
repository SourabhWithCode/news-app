import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const letterCap = (string) => {
        return string.toUpperCase()
    };

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const updateNews = async () => {
        props.setProgress(10)
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        props.setProgress(30)
        setLoading(true)
        let data = await fetch(newsUrl)
        let parsedData = await data.json();
        props.setProgress(70)

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)

        setLoading(false)
    props.setProgress(100)

    }
    useEffect(() => {
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`

        setPage(page + 1)
        setLoading(true)
        let data = await fetch(newsUrl)
        let parsedData = await data.json();


        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
    return (
        <>

            <h1 className='text-center' style={{ margin: '35px 0px',marginTop:"57px" }}>NewsToday- {letterCap(props.category)}-Headline</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                >
          
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title:""} description={element.description ? element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} dates={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
</InfiniteScroll>
            </>
            )
}



            News.defaultProps = {
                country: 'in',
                pageSize: 7,
                category: 'general',
}

            News.propTypes = {
                country: PropTypes.string,
                pageSize: PropTypes.number,
                category: PropTypes.string,
}

            export default News