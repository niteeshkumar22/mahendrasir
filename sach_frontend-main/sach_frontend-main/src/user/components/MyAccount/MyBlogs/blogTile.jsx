import React from "react";
import { EditIcon, DeleteIcon, PreviewIcon, InvalidIcon } from "../../../../admin/icons";
import ShareSvg from "../../../icons/share.svg";
import ChatSvg from "../../../icons/chatbubble.svg";
import { useNavigate } from "react-router-dom";
import { UserRoutes } from "../../../../routes";
const BlogTile = (props) => {
  const navigate = useNavigate();
  const { item, handleSelectedCta, setShowDeleteBlogModal, setShowShareBlogModal, setShowCommentBlogModal } = props;

  const { icon, title, datetime, status, category, subCategory, blogId } = item;

  const getMenuItems = (row) => {
    if (!row.action) return null;
    const res = row?.action.map((item, i) => {
      switch (item.type) {
        case "comment":
          return (
            <span
              onClick={() => {
                handleSelectedCta({ ...row, comment: item?.comment });
                setShowCommentBlogModal(true);
              }}
            >
              <img src={ChatSvg} alt="" />
            </span>
          );
        case "share":
          return (
            <span
              onClick={() => {
                handleSelectedCta(row);
                setShowShareBlogModal(true);
              }}
            >
              <img src={ShareSvg} alt="" />
            </span>
          );
        // case "delete":
        //   return (
        //     <span
        //       onClick={() => {
        //         handleSelectedCta({ ...row, cta: item.cta });
        //         setShowDeleteBlogModal(true);
        //       }}
        //     >
        //       <img src={DeleteIcon} alt="icon" />
        //     </span>
        //   );
        case "edit":
          return (
            <span
              onClick={() => {
                navigate(`${UserRoutes.WRITE_BLOG}?id=${blogId}`);
              }}
            >
              <img src={EditIcon} alt="Like" />
            </span>
          );
        case "view":
          return (
            <span
              onClick={() => {
                navigate(`${UserRoutes.BLOG_DETAIL}?id=${blogId}`);
              }}
            >
              <img src={PreviewIcon} alt="icon" />
            </span>
          );
      }
    });
    return res;
  };
  const actionMenu = getMenuItems(item);
  return (
    <div className="my_blogs">
      <div className="like_share">{actionMenu}</div>
      <div className="blog_thumb">
        <img
          src={icon || InvalidIcon}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = InvalidIcon;
          }}
        />
      </div>
      <div className="blog_dtls">
        <ul className="bullet-list stats">
          <li>{datetime} </li>
          <li>{status?.type === "pending" ? <span className="btn warning">Pending</span> : status?.type === "published" ? <span className="btn success">{status?.value}</span> : status?.type === "draft" ? <span className="btn warning">{status?.value}</span> : ""}</li>
        </ul>
        {title && <h3>{title}</h3>}
        {category && (
          <ul className="bullet-list b_tags">
            <li>{category}</li>
            <li>{subCategory}</li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default BlogTile;
