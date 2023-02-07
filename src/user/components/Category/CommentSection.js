import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState, useRef } from "react";
import SachLoader from "../../../commons/Loader";
import { checkAuthentication, parseHtml, getUserIdUpdated } from "../../../utils/util";
import { useLocation, useNavigate } from "react-router-dom";

const CommentSection = (props) => {
  const { setShowCommentsSection, getVideoLikeComments, sectionData, isLoading, commentData, currVideoObject, userDetails, postCommentsLikesReplies } = props;

  const [showReplies, setShowReplies] = useState(false);
  const [showEmptyReplyBoard, setShowEmptyReplyBoard] = useState(false);
  const [videoCommentText, setVideoCommentText] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("mostRecent");
  const [commentsDt, setCommentData] = useState(commentData?.comments || []);
  const location = useLocation();
  const commentsCount = sectionData["videoDetail"]?.commentsCount || 0;
  let navigate = useNavigate();
  const divScrollRef = useRef();
  const videoId = sectionData["videoDetail"]?.videoId;
  useEffect(() => {
    const data = {
      id: videoId,
      sortBy: selectedSortBy,
    };
    getVideoLikeComments(data);
  }, []);

  useEffect(() => {
    if (commentData?.comments?.length) {
      setCommentData(commentData?.comments);
    }
  }, [commentData]);

  useEffect(() => {
    divScrollRef?.current?.scroll({ top: divScrollRef.current.scrollHeight, behavior: "instant" });
  }, [commentsDt]);

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      onClickPostVideoComment();
    }
  };

  const handleSortByClick = (sortBy) => {
    setSelectedSortBy(sortBy);
    let loggedInUserId = getUserIdUpdated();
    if (sortBy === "onlyYourComments") {
      let filterdComments = commentData?.comments.filter((item) => item?.comment?.userId === loggedInUserId);
      setCommentData(filterdComments);
    } else {
      const data = {
        id: videoId,
        sortBy: sortBy,
      };
      getVideoLikeComments(data);
    }
  };

  const onClickShowReplies = (commentId, toggleShowComment = true) => {
    if (showReplies === commentId && toggleShowComment) {
      setShowReplies(null);
      return;
    }
    setShowEmptyReplyBoard(false);
    setShowReplies(commentId);
  };
  const onClickReplyBtn = (commentId) => {
    setVideoCommentText("");
    setShowEmptyReplyBoard(commentId);
  };
  const handleCommentLikeClick = (commentId) => {
    let data = {
      userId: userDetails?.user?.sachUserId,
      actionType: "COMMENT_LIKE",
      videoId,
      parentCommentId: commentId,
      videoId,
    };
    postCommentsLikesReplies(data);
  };
  const onClickPostVideoComment = () => {
    if (!checkAuthentication()) {
      navigate("/login?redirect=" + window.location.href);
      return;
    }
    if (isEmpty(videoCommentText)) return;
    let data = {
      userId: userDetails?.user?.sachUserId,
      actionType: "COMMENT",
      videoId: videoId,
      comment: {
        body: videoCommentText,
      },
    };
    divScrollRef?.current?.scroll({ top: divScrollRef.current.scrollHeight, behavior: "smooth" });
    postCommentsLikesReplies(data);
  };
  const onClickPostCommentReply = (commentId) => {
    if (!checkAuthentication()) {
      navigate("/login?redirect=" + window.location.href);
      return;
    }
    if (isEmpty(videoCommentText)) return;
    let data = {
      userId: userDetails?.user?.sachUserId,
      actionType: "COMMENT",
      videoId,
      parentCommentId: commentId,
      comment: {
        body: videoCommentText,
      },
    };
    postCommentsLikesReplies(data);
    onClickShowReplies(commentId, false);
  };
  const handleCommentReplyLikeClick = (replyId) => {
    let data = {
      userId: userDetails?.user?.sachUserId,
      actionType: "COMMENT_LIKE",
      videoId,
      parentCommentId: replyId,
    };
    postCommentsLikesReplies(data);
  };

  const renderDirectLevel1Comment = (eachComment) => {
    return (
      <div className="direct-comment">
        <div className="user-cmnt">
          <img src={eachComment?.comment?.userIcon || require("../../../static/user/img/user-image-2.png").default} alt="user-img" />
          <div className="user-data">
            <span>
              <b>{eachComment?.comment?.userName} </b>
              {eachComment?.comment?.createdAt}
            </span>
          </div>
        </div>
        <div className="comment-txt">{parseHtml(eachComment?.comment?.comment?.body)}</div>
        <div className="like_cmnt">
          <div className="L_n_R">
            <div className="lnr_elm">
              {eachComment?.isLiked ? <img src={require("../../../static/user/img/icons/liked.svg").default} alt="like" onClick={() => handleCommentLikeClick(eachComment?.comment?._id)} /> : <img src={require("../../../static/user/img/icons/like.svg").default} alt="like" onClick={() => handleCommentLikeClick(eachComment?.comment?._id)} />}
              <span>{eachComment?.comment?.comment?.likesCount}</span>
            </div>
            {eachComment?.comment?.comment?.replyCount ? (
              <div className="lnr_elm" onClick={() => onClickShowReplies(eachComment?.comment?._id)}>
                <img src={require("../../../static/user/img/icons/chatbubble.svg").default} alt="comment" />
                <span>{eachComment?.comment?.comment?.replyCount} reply</span>
              </div>
            ) : null}
          </div>
          <div className="reply_cmnt" onClick={() => onClickReplyBtn(eachComment?.comment?._id)}>
            Reply
          </div>
        </div>

        <div className="inner-comment">
          {showEmptyReplyBoard === eachComment?.comment?._id && (
            <div className="direct-reply">
              <div className="user-cmnt">
                <img src={userDetails?.user?.icon || require("../../../static/user/img/user-image-2.png").default} alt="user-img" />
                <div className="user-data">
                  <b>{userDetails?.user?.userFullName}</b>
                </div>
              </div>
              <textarea rows="3" placeholder="What is your thought?" onChange={(e) => setVideoCommentText(e.target.value)}></textarea>
              <div className="cmntBtnWrp">
                <span className="btn btn-sach bg-sach-dark" onClick={() => setShowEmptyReplyBoard(false)}>
                  Cancel
                </span>
                <span className="btn btn-sach bg-sach-dark" onClick={() => onClickPostCommentReply(eachComment?.comment?._id)}>
                  Send
                </span>
              </div>
            </div>
          )}
          {showReplies === eachComment?.comment?._id &&
            eachComment?.replies?.length > 0 &&
            eachComment?.replies.map((eachReply) => {
              return (
                <div className="direct-comment">
                  <div className="user-cmnt">
                    <img src={eachReply?.userIcon || require("../../../static/user/img/user-image-2.png").default} alt="user-img" />
                    <div className="user-data">
                      <b>{eachReply?.userName}</b>
                      <span>{eachReply?.createdAt}</span>
                    </div>
                  </div>
                  <div className="comment-txt">{parseHtml(eachReply?.comment?.body)}</div>
                  <div className="like_cmnt">
                    <div className="L_n_R">
                      <div className="lnr_elm">
                        {eachReply?.isLiked ? <img src={require("../../../static/user/img/icons/liked.svg").default} alt="like" onClick={() => handleCommentReplyLikeClick(eachReply?._id)} /> : <img src={require("../../../static/user/img/icons/like.svg").default} alt="like" onClick={() => handleCommentReplyLikeClick(eachReply?._id)} />}

                        <span>{eachReply?.comment?.likesCount}</span>
                      </div>
                      {/* <div className="lnr_elm">
                          <img src={require("../../../static/user/img/icons/chatbubble.svg").default} alt="comment" />
                            <span>1 reply</span>
                          </div> */}
                    </div>
                    {/* <div className="reply_cmnt" onClick={() => onClickReplyBtn(eachComment?.comment?._id)}>Reply</div> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="comment-section slide-show">
        <SachLoader />
      </section>
    );
  }

  return (
    <>
      <section className="comment-section slide-show">
        <div className="close-comment" onClick={() => setShowCommentsSection(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4142 11.9998L17.7072 7.70676C18.0982 7.31576 18.0982 6.68376 17.7072 6.29276C17.3162 5.90176 16.6842 5.90176 16.2933 6.29276L12.0002 10.5858L7.70725 6.29276C7.31625 5.90176 6.68425 5.90176 6.29325 6.29276C5.90225 6.68376 5.90225 7.31576 6.29325 7.70676L10.5862 11.9998L6.29325 16.2928C5.90225 16.6838 5.90225 17.3158 6.29325 17.7068C6.48825 17.9018 6.74425 17.9998 7.00025 17.9998C7.25625 17.9998 7.51225 17.9018 7.70725 17.7068L12.0002 13.4138L16.2933 17.7068C16.4882 17.9018 16.7443 17.9998 17.0002 17.9998C17.2562 17.9998 17.5122 17.9018 17.7072 17.7068C18.0982 17.3158 18.0982 16.6838 17.7072 16.2928L13.4142 11.9998Z" />
          </svg>
        </div>
        <div className="comment-head">
          <span className="h2">{commentsCount} Comments</span>
          <select className="form-control" value={selectedSortBy} onChange={(e) => handleSortByClick(e?.target?.value)}>
            <option value="mostRecent">Most Recent</option>
            <option value="onlyYourComments">Only Your Comments</option>
          </select>
        </div>
        <div className="cmnt-wrp" ref={divScrollRef}>
          {commentsDt.length > 0 &&
            commentsDt.map((comment) => {
              return renderDirectLevel1Comment(comment);
            })}
          {!showEmptyReplyBoard && (
            <div className="write-cmnt-wrp">
              <div className="comment-group">
                <input type="text" className="form-control write-comment" placeholder="What is your thought?" onChange={(e) => setVideoCommentText(e.target.value)} onKeyDown={(event) => handleKeyDown(event)} autoFocus />
                <span className="btn btn-sach bg-sach-dark" onClick={onClickPostVideoComment}>
                  Post
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CommentSection;
