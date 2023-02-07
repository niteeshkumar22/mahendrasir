import React, { useState } from "react";
import AdminModal from "../../Common/AdminModal";

const PlayVideoModal = ({ handleCancel, videoData }) => {
    if (!videoData?.channelKey) return null;
    return (
        <AdminModal
            centered
            closable={false}
            onCancel={handleCancel}
            visible={true}
            footer={null}
            width={1100}
            bodyStyle={{
                padding: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.45)"
            }}
        >
            <div data-dyntube-key={videoData?.channelKey}></div>
            {/* <div className="">
                <div class="dyntube-iframe-container">
                    <iframe class="dyntube-responsive-iframe w-100"
                        allow="autoplay; fullscreen"
                        autoPlay
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                        src={videoData?.channelKey}
                        title={videoData?.videoTitle}>
                    </iframe>
                </div>
            </div> */}
        </AdminModal>
    );
};

export default PlayVideoModal;
