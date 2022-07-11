import React from 'react'


const NewsItem = (props) => {


        let { title, description, imageUrl, newsUrl, dates, source,} =props;
        
        return (
            <div className='my-4 d-flex justify-content-center'>
                <div className="card" style={{ width: "18rem" }}>
                <span className={`position-absolute top-0  translate-middle badge rounded-pill bg-success`} style={{left:"50%"}}>
                            {source}
                        </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold">{title.slice(0,70)}...</h5>
                        <p className="card-text">{description.slice(0,100)}...</p>
                        <p className="card-text"><small className="text-danger">Last updated {new Date(dates).toLocaleDateString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-outline-success fw-bold">Read More</a>
                    </div>
                </div>
            </div>
        )

}

export default NewsItem
