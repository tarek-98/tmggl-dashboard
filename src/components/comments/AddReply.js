import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../../store/slices/commentSlice";

const AddReply = ({ commentId, setReplyMode, product }) => {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const { status, admin, isLoggedIn } = useSelector((state) => state.auth);
  const user = admin && admin[`Super Admin ID`];
  const productId = product._id;
  const onreplyChanged = (e) => setReply(e.target.value);

  const onSaveReplyClicked = () => {
    if (reply) {
      dispatch(addReply({ productId, commentId, user, reply }));
      setReply("");
      setReplyMode(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        value={reply}
        onChange={onreplyChanged}
        className="reply-input"
      />
      <button
        type="button"
        onClick={onSaveReplyClicked}
        className="reply-button"
        disabled={!isLoggedIn || reply === ""}
      >
        رد
      </button>
      <button onClick={() => setReplyMode(null)} className="reply-button">
        الغاء
      </button>
    </div>
  );
};

export default AddReply;
