import React, { useState } from "react";
import Logo from "../../../../../static/user/img/logo.svg";
import calendarIcon from "../../../../../static/user/img/icons/calendar-o.svg";
import clockIcon from "../../../../../static/user/img/icons/clock-o.svg";
import locationIcon from "../../../../../static/user/img/icons/location-o.svg";
import callIcon from "../../../../../static/user/img/icons/call-o.svg";
import AdminModal from "../../../../../admin/components/Common/AdminModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JsPDF from "jspdf";
//  import html2canvas from 'html2canvas'
import domtoimage from "dom-to-image";
import { InvalidIcon } from "../../../../../admin/icons";
import { getCurrentUserDetails } from "../../../../../utils/util";
const ViewTicketModal = ({ handleCancel, handleRegisterClick, chooseItem, onClickShareEvent }) => {
  const [authorImagePath, setAuthorImagePath] = useState(chooseItem.authorImg);
const userDetails = getCurrentUserDetails();
  const generatePDF = () => {
    setAuthorImagePath(require("../../../../../static/user/img/user-image.png").default);
    let report = document.querySelector("#ticket");
    const pdf = new JsPDF("portrait", "pt", "a4");
    if (pdf) {
      domtoimage
        .toPng(report)
        .then((imgData) => {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          // const widthRatio = pageWidth / imgData.width;
          // const heightRatio = pageHeight / imgData.height;
          // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

          // const canvasWidth = imgData.width * ratio;
          // const canvasHeight = imgData.height * ratio;

          // const marginX = (pageWidth - canvasWidth) / 2;
          // const marginY = (pageHeight - canvasHeight) / 2;

          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
          pdf.save("ticket.pdf");
          setAuthorImagePath(chooseItem.authorImg);
        })
        .catch((err) => {
          setAuthorImagePath(chooseItem.authorImg);
          console.log("err", err);
        });
    }
  };
  const onClickShare = () => {
    onClickShareEvent(chooseItem);
  };
  return (
    <AdminModal className="viewTicketModal" closable={false} centered visible={true} onCancel={handleCancel} footer={null}>
      <div class="modal-body ticket-body">
        <img src={Logo} alt="logo" class="img-fluid w-100" />
        <div class="ticket-wrp">
          <ul class="ticket-pill">
            {chooseItem.tags?.map((eachtag) => {
              return (
                <li>
                  <span>{eachtag}</span>
                </li>
              );
            })}
          </ul>
          <div class="event-head">{chooseItem.title}</div>
          <ul class="event-info justify-content-between">
            <li>
              <img src={calendarIcon} alt="event-ico" />
              <b>
                {chooseItem.dayName} , {chooseItem.date}
              </b>
            </li>
            <li>
              <img src={clockIcon} alt="event-ico" />
              <b>
                {chooseItem.startTime} - {chooseItem.endTime} {chooseItem.timeZone}
              </b>
            </li>
            <li>
              <img src={locationIcon} alt="event-ico" />
              <b>{chooseItem.address}</b>
            </li>
          </ul>
          <span class="evntInfoTTL">Hosted by:</span>
          <div class="eventHost">
            <img
              src={authorImagePath}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = InvalidIcon;
              }}
            />
            <span>{chooseItem.author}</span>
          </div>
          <div class="attendeeInfo">
            <span class="evntInfoTTL">Attendee Info:</span>
            <ul class="event-info py-0">
              <li>
                <img src={userDetails.user.icon} alt="event-ico" />
                <b>{userDetails.user.userFullName}</b>
              </li>
              <li>
                <img src={callIcon} alt="event-ico" />
                <b>{userDetails.user.userContact}</b>
              </li>
            </ul>
          </div>

          <div class="row mt-4">
            <div class="col-md-6">
              <a href="javascript:void(0);" onClick={() => onClickShare()} class="btn btn-sach btn-sach-linear justify-content-center w-100">
                Share
              </a>
            </div>
            <div class="col-md-6">
              <a href="javascript:void(0);" onClick={() => generatePDF()} class="btn btn-sach bg-sach justify-content-center w-100">
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ViewTicketModal;
