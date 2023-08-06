import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Review from './Review';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://redux-server-53il.onrender.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }

    };
    return (
        <div className='mb-28 '>
            <h2 className='text-center text-primary text-4xl font-bold uppercase py-5'>review</h2>
            <Carousel
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                className='w-[90%] mx-auto' >
                {
                    reviews.map((review, index) => <Review
                        key={index}
                        review={review}
                    ></Review>)
                }
            </Carousel>
        </div>
    );
};

export default Reviews;