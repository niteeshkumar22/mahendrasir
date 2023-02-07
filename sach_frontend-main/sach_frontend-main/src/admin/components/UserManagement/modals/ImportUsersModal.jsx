import { Upload } from "antd";
import React, { useState } from "react";
import { DownloadIcon, DropFileIcon } from "../../../icons";
import { csvToArray, formatBytes } from "../../../../utils/util";
import AdminModal from "../../Common/AdminModal";
const { Dragger } = Upload;

const ImportUserModal = ({ handleCancel, handleInviteUser }) => {
  const [progress, setProgress] = useState(0);

  const [fileData, setFileData] = useState([]);

  const draggerProps = {
    name: "csvfile",
    accept: ".csv",
    maxCount: 1,
    action: (file) => {
      console.log("my file: ", file);
    },
    // itemRender(originNode, file, currFileList) {
    //   return (
    //     <div className="file-upload-item ">
    //       <p>{file.name}</p>
    //       <p>{formatBytes(file.size)}</p>
    //     </div>
    //   );
    // },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.onload = (e) => {
          const text = e.target.result;
          const data = csvToArray(text);
          setFileData(data);
        };
        Reader.readAsText(file);
        reject(true);
      });
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <AdminModal
      onCancel={handleCancel}
      width={800}
    >
      <div>
        
          <div className="sub-page-title py-3 d-flex align-items-center">
            <h2>Bulk Registration</h2>
            <a
              target={"_blank"}
              href="https://sach-public-file.s3.ap-south-1.amazonaws.com/inviteUserTemplate.csv"
              download
              className="btn-sach btn-sach-sm btn-sach-linear-theme ms-3"
            >
              <img src={DownloadIcon} />
              <span>Download Sample file</span>
            </a>
          </div>
       
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <img src={DropFileIcon} />
          </p>
          <div className="dropDes">
            <span>Drag &amp; Drop your the file here</span>
            <small> or </small>
            <a>Browse</a>
          </div>
        </Dragger>
        <div className=" text-end mt-4">
          <button
            className="btn-sach btn-sach-linear me-3"
            onClick={handleCancel}
          >
            <span>Cancel</span>
          </button>
          <button
            className="btn-sach bg-sach-dark"
            // disabled={fileData.length < 1}
            onClick={() => {
              console.log("fileData", fileData);
              if (fileData.length > 0) {
                handleInviteUser({
                  identifier: "csv",
                  users: fileData,
                });
                handleCancel(); //close modal
              }
            }}
          >
            <span>Send Invite</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default ImportUserModal;
