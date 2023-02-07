import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { showPopup } from "../../../redux/action/common";
import './style.css';

const ShareEventPopup = (props) => {
    const { showPopup, popupData } = props;
    return (
        <Modal
            className=""
            centered
            visible={true}
            onCancel={() => showPopup(null)}
            footer={null}>
            <div>
                <div class="sach-title indv">
                    <h4>Share a link</h4>
                </div>
                {/* <div class="row g-0 share-icons">
          <div class="col">
            <img src="img/icons/embed.svg" alt="Social Icons">
            <b>Embed</b>
          </div>
          <div class="col">
            <img src="img/icons/facebook-blue.svg" alt="Social Icons">
            <b>Facebook</b>
          </div>
          <div class="col">
            <img src="img/icons/twitter.svg" alt="Social Icons">
            <b>Twitter</b>
          </div>
          <div class="col">
            <img src="img/icons/reddit.svg" alt="Social Icons">
            <b>Reddit</b>
          </div>
          <div class="col">
            <img src="img/icons/telegram.svg" alt="Social Icons">
            <b>Telegram</b>
          </div>
          <div class="col">
            <img src="img/icons/blogger.svg" alt="Social Icons">
            <b>Blogger</b>
          </div>
        </div> */}
                <div class="input-group">
                    <input type="text" class="form-control"  placeholder="Share link" readonly value={(popupData?.shareLink+"&cl="+popupData?.cl)} />
                    <button class="btn btn-outline-secondary" onClick={() => {navigator.clipboard.writeText((popupData?.shareLink+"&cl="+popupData?.cl))}}
 type="button">Copy</button>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        ...state,
        commonData: state?.CommonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPopup: (type, data) => dispatch(showPopup(type, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareEventPopup);