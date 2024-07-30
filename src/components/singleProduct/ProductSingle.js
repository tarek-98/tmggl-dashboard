import React, { useEffect, useRef, useState } from "react";
import "./singleProduct.css";
import "./product.css";
import "../slideOvelay/slideOverlay.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
} from "../../store/slices/productsSlice";
import SlideOverlay from "../slideOvelay/SlideOverlay";
import { FaVolumeXmark } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Comments from "../comments/CommentList";
import vid from "../../videos/Download.mp4";
import BottomOption from "../bottomOption/BottomOption";
import "../bottomOption/addProduct.css";
import Slider from "../control/slider/Slider";
import ControlPanel from "../control/controls/ControlPanel";
import { CiVolumeMute } from "react-icons/ci";
import { AiOutlineSound } from "react-icons/ai";

function ProductSingle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector(getProductSingle);
  const product = productData.product;
  const comments = product ? product.comments : null;
  const [volume, setVolume] = useState(false);
  const [sound, setSound] = useState(true);
  const [comment, setComment] = useState(false);
  const [info, setInfo] = useState(false);
  const [social, setSocial] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [livePrice, setLivePrice] = useState(null);
  const [liveImg, setLiveImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const videoRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
    console.log(product);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    document.title = product && `${product.name}`;
  }, []);

  // Grouping by namechoose
  const groupedChooses =
    product &&
    product.chooses.reduce((acc, choose) => {
      const { namechoose } = choose;
      if (!acc[namechoose]) {
        acc[namechoose] = [];
      }
      acc[namechoose].push(choose);
      return acc;
    }, {});

  //handle size
  const [toggleState, setToggleState] = useState(null);

  /*control*/
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleSliderChange = (e) => {
    const newPercentage = e.target.value;
    setPercentage(newPercentage);

    if (videoRef.current) {
      const newTime = (videoRef.current.duration / 100) * newPercentage;
      videoRef.current.currentTime = newTime;

      console.log(`Slider Value: ${newPercentage}, New Time: ${newTime}`);
    }
  };

  const getCurrDuration = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    if (duration > 0) {
      const percent = ((current / duration) * 100).toFixed(2);
      setPercentage(+percent);
      setCurrentTime(current.toFixed(2));
    }
  };
  /* */

  return (
    <div className="single-product video-card">
      <div className="video-slide-container">
        <div className="plyer-container">
          <div>
            <video
              id={id}
              src={product && product.video}
              className="react-player"
              autoPlay={true}
              muted={sound}
              loop
              playsInline={true}
              ref={videoRef}
              onTimeUpdate={getCurrDuration}
              onLoadedData={(e) => {
                setDuration(e.target.duration.toFixed(2));
              }}
              onClick={togglePlay}
            ></video>
            <div className="controls">
              <Slider
                percentage={percentage}
                onChange={(e) => handleSliderChange(e)}
              />
              <ControlPanel duration={duration} currentTime={currentTime} />
              <div className="sound-icon ms-1">
                {sound ? (
                  <CiVolumeMute
                    className="fs-4"
                    onClick={() => setSound(false)}
                  />
                ) : (
                  <AiOutlineSound
                    className="fs-4"
                    onClick={() => setSound(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <SlideOverlay
          product={product}
          comment={comment}
          setComment={setComment}
          social={social}
          setSocial={setSocial}
          info={info}
          setInfo={setInfo}
        />
        <BottomOption setAddProduct={setAddProduct} product={product} />
      </div>

      {product && (
        <div className={comment ? "comment-wrapper" : "comment-wrapper-hide"}>
          <div className="comment-wrapper-overlay"></div>
          <div className="comment-wrapper-container">
            <div className="close text-dark">
              <IoIosCloseCircleOutline
                className="text-dark"
                onClick={() => setComment((comment) => !comment)}
              />
              <h2 className="text-comment d-flex justify-content-center align-items-center gap-2 fs-4">
                {comments.length > 0 ? "Comments" : "No Comments"}{" "}
                {comments.length > 0 && (
                  <span className="fs-5">{comments.length}</span>
                )}
              </h2>
            </div>
            <Comments product={product} />
          </div>
        </div>
      )}

      {product && (
        <div className={info ? "info-home" : "info-home-hide"}>
          <div className="info-overlay"></div>
          <div className="info-container p-3 text-dark">
            <div
              className="close mb-2"
              onClick={() => setInfo((info) => !info)}
            >
              <IoIosCloseCircleOutline className="text-dark" />
            </div>
            <div className="product-details text-dark">
              {product.description}
            </div>
          </div>
        </div>
      )}

      {product && (
        <div className={addProduct ? "add-product" : "add-product-hide"}>
          <div className="addProduct-overlay"></div>
          <div className="addProduct-container">
            <div
              className="close text-dark"
              onClick={() => setAddProduct((addProduct) => !addProduct)}
            >
              <IoIosCloseCircleOutline className="text-dark" />
            </div>
            <div className="product-option">
              <div>
                <div className="product-img">
                  <div className="product-img-zoom w-100 mb-2">
                    {liveImg ? (
                      <img
                        src={liveImg}
                        alt=""
                        className="img-cover w-100 h-100"
                      />
                    ) : (
                      <img
                        src={product.img}
                        alt=""
                        className="img-cover w-100 h-100"
                      />
                    )}
                  </div>
                  <div className="product-img-thumbs d-flex align-center">
                    {product &&
                      product.chooses.map((item) => {
                        return (
                          <div className="thumb-item">
                            <img
                              src={item.img}
                              alt=""
                              className="img-cover w-100"
                              onClick={() => {
                                setLivePrice(item.pricechoose);
                                setLiveImg(item.img);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="product-single-r mt-1" dir="rtl">
                  <div className="product-details font-manrope">
                    <div className="title mb-3 text-dark">{product.name}</div>
                    <div className="product loc">
                      <span className="text-dark">يشحن من </span>
                      <span className=" text-danger">الرياض</span>
                    </div>
                    <div className="price mb-2">
                      <div className="d-flex align-center">
                        <div className="new-price ms-3">
                          <span className="text-dark">السعر : </span>
                          {livePrice ? (
                            <span className="text-dark">
                              {(livePrice + livePrice * 0.15) * quantity}
                              ر.س
                            </span>
                          ) : (
                            <span className="text-dark">
                              {(product.price + product.price * 0.15) *
                                quantity}
                              ر.س
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="size-opt d-flex flex-column">
                      {Object.entries(groupedChooses).map(
                        ([namechoose, items]) => (
                          <div key={namechoose}>
                            <div
                              className="size-change d-flex"
                              key={namechoose}
                            >
                              <h5 className="text-dark">{namechoose}</h5>
                              {items.map(
                                ({
                                  _id,
                                  pricetypechoose,
                                  pricechoose,
                                  img,
                                  color,
                                }) => (
                                  <ul className="size-list">
                                    <li
                                      className="list-item"
                                      onClick={() => setToggleState(color)}
                                      key={color}
                                    >
                                      <span
                                        className={
                                          toggleState === color
                                            ? "list-item-opt active"
                                            : "list-item-opt"
                                        }
                                      >
                                        {color}
                                      </span>
                                    </li>
                                  </ul>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSingle;
