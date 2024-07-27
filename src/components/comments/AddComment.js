import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/slices/commentSlice";

const AddComment = ({ product }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { userInfo, isLoggedIn } = useSelector((state) => state.auth);
  const { status, admin } = useSelector((state) => state.auth);
  const client = admin && admin[`Super Admin ID`];
  const productId = product._id;

  const onContentChanged = (e) => setComment(e.target.value);

  const onSaveCommentClicked = () => {
    if (comment) {
      dispatch(addComment({ productId, client, comment }));
      setComment("");
      // setTimeout(() => {
      //   dispatch(fetchAsyncProducts());
      // }, 1000);
    }
  };

  return (
    <Fragment>
      <input
        value={comment}
        onChange={onContentChanged}
        className="comment-input"
      />
      <button
        type="button"
        onClick={onSaveCommentClicked}
        className="comment-button"
        disabled={!isLoggedIn || comment === ""}
      >
        اضف
      </button>
    </Fragment>
  );
};

export default AddComment;
