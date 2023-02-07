import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useState } from "react";
import { AvatarIcon } from "../../icons";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const UploadPic = ({ isUploadLoader, handleUploadFile, userIcon }) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(userIcon);
  

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      console.log("uploading",info);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      return;
    }
  };

  const uploadButton = (
    <>{loading ? <LoadingOutlined /> : <img style={{width: "100%"}} src={AvatarIcon} />}</>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={
        (file) => {
          const data = new FormData();
          data.append(
            "file",
            file,
            file.name
          );
          handleUploadFile(data)
        }
      }
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: "100%",
          }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = AvatarIcon;
              }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadPic;


