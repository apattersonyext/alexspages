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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    rating: 1,
    content: "",
  });

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitReview = () => {
    const apiKey = "ca0b63e4d4dd522282395a103626ff77";
    const apiUrl = `https://sbx-cdn.yextapis.com/v2/accounts/me/reviewSubmission?api_key=${apiKey}&v=20231107`;

    const requestBody = {
      entity: {
        id: entityid,
      },
      authorName: formData.authorName,
      authorEmail: formData.authorEmail,
      rating: formData.rating,
      content: formData.content,
      status: "LIVE",
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response as needed
        // You can update the UI to show a success message or handle errors here.
        closeForm();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        // Handle the error
      });
  };

  const StarRating = ({ value, onChange }) => {
    const maxRating = 5;
  
    const handleStarClick = (rating) => {
      onChange(rating);
    };
  
    return (
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className={`cursor-pointer text-xl ${
                starValue <= value ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(starValue)}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    );
  };
  

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
      <div className=" max-w-7xl mx-auto px-5 md:px-14 pt-8 pb-24">
        <h2 className="section text-4xl text-gray-900 text-center tracking-tight font-bold">
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

        <div className="mt-10 flex justify-center">
          <button
            onClick={openForm}
            className="rounded-md border border-gray-950 text-gray-900 font-semibold px-6 py-4 rounded-lg"
          >
            Write a Review
          </button>
        </div>

        {/* Review submission form as a popup */}
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-end">
              <button
                onClick={closeForm}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                X
              </button>
            </div>
            <h3 className="text-xl font-semibold mb-4">Submit a Review</h3>
            <form>
              <div className="mb-4">
                  <label className="block text-gray-600" htmlFor="authorName">
                    Name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600" htmlFor="authorEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="authorEmail"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Rating</label>
                  <StarRating
                    value={formData.rating}
                    onChange={(value) =>
                      setFormData({ ...formData, rating: value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600" htmlFor="content">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={submitReview}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Reviews;
