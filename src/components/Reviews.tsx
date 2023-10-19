import * as React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useCallback, useEffect } from "react";
import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";

export interface ReviewsProps {
  title?: string;
  entityid: string; // New prop to specify the entity ID
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretRightCircle
      className={className}
      color="#000000"
      style={{
        ...style,
        height: "50px",
        width: "30px",
      }}
      onClick={onClick}
    />)
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretLeftCircle
      style={{
        ...style,
        height: "50px",
        width: "30px",
        zIndex: 10,
      }}
      className={className}
      color="#000000"
      size={50}
      onClick={onClick}
    />)
};

const Reviews = ({ title, entityid }: ReviewsProps) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = "ca0b63e4d4dd522282395a103626ff77";
    const apiUrl = `https://sbx-cdn.yextapis.com/v2/accounts/me/content/reviews?api_key=${apiKey}&v=20231019`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.response && data.response.docs) {
          const matchingReviews = data.response.docs.filter(
            (review) => review.entity.id === entityid
          );
          setReviews(matchingReviews);
        } else {
          setReviews([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setLoading(false);
      });
  }, [entityid]);

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px`);
      media.addEventListener("change", updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", updateTarget);
    }, []);

    return targetReached;
  };

  const generateStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <span key={i} className="text-yellow-400">&#9733;</span> // Display gold star
        ) : (
          <span key={i} className="text-gray-300">&#9733;</span> // Display gray star
        )
      );
    }
    return stars;
  };

  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3, // Display up to 3 cards before requiring a click
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true,
    swipeToSlide: false,
    prevArrow: <PrevArrow className="" />,
    nextArrow: <NextArrow className="" />,
  };

  const isBreakpoint = useMediaQuery(768);

  return (
    <>
      <div className="mx-auto px-5 md:px-14 bg-gray-100 pt-8 pb-24">
        <h2 className="section text-3xl text-center tracking-tight font-bold">
          <a id="reviews">{title}</a>
        </h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <Slider {...settings} className="slick-carousel">
            {reviews.map((review) => (
              <div key={review.$key.primary_key} className="review-card p-4">
                <div className="rounded-md p-4 bg-white shadow-lg">
                  <p className="font-bold text-lg">{`${review.authorName}`}</p>
                  <p className="mt-2">
                    <span className="text-yellow-400">{generateStarRating(review.rating)}</span>
                  </p>
                  <p className="mt-2">{`${review.content}`}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
    </>
  );
};

export default Reviews;
