// src/components/EmailForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailToAllVendors, mailToAllClient } from "../../store/slices/sendMail";

const EmailForm = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.sendMail);
  const { status, admin } = useSelector((state) => state.auth);
  const id = admin[`Super Admin ID`];
  // const id = `6686fc0af1610107d3a4fedd`;

  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [clientSubject, setClientSubject] = useState("");
  const [clienttext, setClientText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(mailToAllVendors({ id, subject, text }));
    console.log({ id, subject, text });
    setSubject("");
    setText("");
  };
  const handleSubmitClient = (e) => {
    e.preventDefault();
    dispatch(mailToAllClient({ id, subject: clientSubject, text: clienttext }));
    console.log({ id, subject, text });
    setClientSubject("");
    setClientText("");
  };

  useEffect(() => {
    document.title = "ارسال ميل";
  }, []);

  return (
    <div className="container mt-5">
      <div className="mb-5">
        <h2 className="text-center mb-4">ارسال ايميل الي كل التجار</h2>
        {success && <div className="alert alert-success">تم ارسال الايميل</div>}
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
          <div className="form-group">
            <label htmlFor="subject">العنوان</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">النص</label>
            <textarea
              id="text"
              className="form-control"
              rows="5"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3 "
              disabled={loading}
            >
              {loading ? "يتم الارسال..." : "ارسال"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-center mb-4">ارسال ايميل الي كل العملاء</h2>
        {success && <div className="alert alert-success">تم ارسال الايميل</div>}
        <form
          onSubmit={handleSubmitClient}
          className="shadow p-4 rounded bg-light"
        >
          <div className="form-group">
            <label htmlFor="clientSubject">العنوان</label>
            <input
              type="text"
              id="clientSubject"
              className="form-control"
              value={clientSubject}
              onChange={(e) => setClientSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="clienttext">النص</label>
            <textarea
              id="clienttext"
              className="form-control"
              rows="5"
              value={clienttext}
              onChange={(e) => setClientText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3"
              disabled={loading}
            >
              {loading && clientSubject ? "يتم الارسال..." : "ارسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
