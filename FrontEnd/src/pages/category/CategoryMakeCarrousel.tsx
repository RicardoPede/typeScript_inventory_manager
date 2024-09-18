import React from 'react';
import Slider from 'react-slick';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Category from './Category';
import Make from '../make/Make';

const CategoryMakeCarousel: React.FC = () => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,

        className: "",
        adaptiveHeight: true
    };

    return (
        <div style={{ width: '100%' }}>
            <ToastContainer />
            <Slider {...settings}>
                <div className="bg-success border w-100" style={{ width: '100%' }}>
                    <Category />
                </div>
                <div className="bg-warning border w-100" style={{ width: '100%' }}>
                    <Make />
                </div>
            </Slider>
        </div>
    );
};

export default CategoryMakeCarousel;