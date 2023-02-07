import {
  Row,
  Col,
  DatePicker,
  Input,
  Modal,
  Select,
  Radio,
  Form,
  Spin,
  Upload,
  message,
} from "antd";
const { Dragger } = Upload;
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LoadingOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import moment from "moment";
const { Option } = Select;
import {
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  DropFileIcon,
  GoogleMapIcon,
  GoogleMeetIcon,
  MicrosoftTeamIcon,
  ZoomMeetingIcon
} from "../../../icons";
import {
  getEventDetail,
  handleCreateEvent,
  handleGenerateEvent,
  handleUploadFile,
  resetKey,
} from "../../../../redux/action/admin/eventMgmt";
import { getCategoryData } from "../../../../redux/action/admin/categoryMgmt";
import { connect } from "react-redux";
import AdminModal from "../../Common/AdminModal";
import SimpleEditor from "../../../../commons/TextEditor/SimpleEditor";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CreateEventModal = ({
  handleCancel,
  handleCreateEvent,
  handleGenerateEvent,
  getCategoryData,
  getEventDetail,
  resetKey,
  categoryData,
  thumbnailURL,
  meetLink,
  zoomLink,
  teamsLink,
  eventDetail,
  editEventId,
  isUploadLoader,
  handleUploadFile,
}) => {
  const [descValue, setDescValue] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [linkInProgress, setLinkInProgress] = useState(null);

  /** Watch few form fields sicne they are required for meeting link creation */
  const [creatEventForm] = Form.useForm();
  const title = Form.useWatch("eventTitle", creatEventForm);
  const eventDateTime = Form.useWatch("eventDateTime", creatEventForm);
  const eventDateTimeEnd = Form.useWatch("eventDateTimeEnd", creatEventForm);
  const eventMode = Form.useWatch("eventMode", creatEventForm);

  /************ */

  useEffect(() => {
    if(editEventId && !eventDetail) {
      setTimeout(() => {
        getEventDetail({eventId: editEventId})
      }, 0)
    } else {
      getCategoryData();
    }

    if(editEventId && eventDetail) {
      creatEventForm.resetFields();
      const eventDateTime= moment(eventDetail.eventDateTime);
      const eventDateTimeEnd= moment(eventDetail.eventDateTimeEnd)
      const initValues  = {
        ...eventDetail,
        eventDateTime,
        eventDateTimeEnd
      }

      // add descripion in state
      setDescValue(eventDetail.eventDesc);
      console.log('initValues: ', initValues);
      creatEventForm.setFieldsValue(initValues)
    }

  }, [editEventId, eventDetail])

  const onFinish = (values) => {
    const data = {
      ...values,
      eventId : editEventId,
      eventDesc: descValue,
      eventDateTime: values.eventDateTime.toDate(),
      eventDateTimeEnd: values.eventDateTimeEnd.toDate(),
      eventThumnailUrl: thumbnailURL,
      eventAttendiEmail: values?.eventAttendiEmail?.split(","),
      eventModeUrl: [
        {
          type: "zoom",
          url: zoomLink || "",
        },
        {
          type: "meet",
          url: meetLink || "",
        },
        {
          type: "teams",
          url: teamsLink || "",
        },
      ],
    };
    console.log("values:", data);
    handleCreateEvent(data);
    handleCancel();
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < moment().endOf("day");
  };

  const handleAddLink = (type) => {
    if (!title) {
      message.error("Please add event title");
    } else if (!descValue) {
      message.error("Please add event description");
    } else if (!eventDateTime) {
      message.error("Please add event start Date & Time");
    } else if (!eventDateTimeEnd) {
      message.error("Please add event end Date & Time");
    } else {
      setLinkInProgress(type);
      handleGenerateEvent({
        title,
        descValue,
        eventDateTime,
        eventDateTimeEnd,
        type,
      });
    }
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const renderGeneratedLink = (link, type) => {
    const linkKey = `${type}Link`;
    return (
      <div className="genrtdLink">
        <a href={link} target="_blank">
          {link}
        </a>

        <div className="actionBtn">
          <a>
            <CopyToClipboard
              text={link}
              onCopy={() => {
                message.success("Link copied!");
              }}
            >
              <img src={CopyIcon} alt="Copy Link" />
            </CopyToClipboard>
          </a>
          <a onClick={() => resetKey({[linkKey] : null })}>
            <img src={CloseIcon} alt="Close Link" />
          </a>
        </div>
      </div>
    );
  };

  const renderEventAddMeeting = () => (
    <div className="col-12">
      <div className="onlineEventLinks">
        <div className="onlineEventMain">
          {isUploadLoader && linkInProgress === "meet" && (
            <Spin className="me-md-3" indicator={antIcon} />
          )}
          <img src={GoogleMeetIcon} alt="Google Meet" />
          <div className="pltfrm">
            <span>Google Meet</span>
            {!meetLink && (
              <a className="addLink" onClick={() => handleAddLink("meet")}>
                Add
              </a>
            )}
          </div>
        </div>
        {meetLink && renderGeneratedLink(meetLink, "meet")}
      </div>
      <div className="onlineEventLinks">
        <div className="onlineEventMain">
          {isUploadLoader && linkInProgress === "zoom" && (
            <Spin className="me-md-3" indicator={antIcon} />
          )}
          <img src={ZoomMeetingIcon} alt="Zoom" />
          <div className="pltfrm">
            <span>Zoom Meeting</span>
            {!zoomLink && (
              <a className="addLink" onClick={() => handleAddLink("zoom")}>
                Add
              </a>
            )}
          </div>
        </div>
        {zoomLink && renderGeneratedLink(zoomLink, "zoom")}
      </div>
      <div className="onlineEventLinks">
        <div className="onlineEventMain">
          {isUploadLoader && linkInProgress === "teams" && (
            <Spin className="me-md-3" indicator={antIcon} />
          )}
          <img src={MicrosoftTeamIcon} alt="Teams" />
          <div className="pltfrm">
            <span>Microsoft Teams</span>
            {!teamsLink && (
              <a className="addLink" onClick={() => handleAddLink("teams")}>
                Add
              </a>
            )}
          </div>
        </div>
        {teamsLink && renderGeneratedLink(teamsLink, "teams")}
      </div>
    </div>
  );
  const renderEventAddLocation = () => (
    <Row>
      <Col span={11}>
        <Form.Item name="eventLocationUrl" label="Add Location">
          <Input />
        </Form.Item>
      </Col>
      <Col span={2}>
        <div style={{textAlign: "center"}}>or
        </div></Col>
      <Col span={11}>
        <a className="sach-btn ghost-btn form-align">
          <img src={GoogleMapIcon} alt="GoogleMap" class="m-0 me-3" />
          <span>Google Map</span>
          <img src={ChevronRightIcon} alt="chevron-right" class="ms-2" />
        </a>
      </Col>
    </Row>
  );
  const draggerProps = {
    name: "thumbnail",
    accept: ".jpeg,.png",
    maxCount: 1,
    action: (file) => {
      const data = new FormData();
        data.append(
          "file",
          file,
          file.name
        );
        console.log('handleUploadFile:', handleUploadFile);
        handleUploadFile(data);
    },
    beforeUpload:(file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
    
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return true;
      }

      const data = new FormData();
      data.append("file", file, file.name);
      handleUploadFile(data);
      return false;
    },
  
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log("uploading: ", info.file, info.fileList);
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
      onOk={handleCreateEvent}
      onCancel={() => {
        resetKey({ eventDetail: null})
        creatEventForm.resetFields();
        handleCancel();
      }}
      footer={null}
      width={800}
    >
      <div className="sub-page-title py-3">
        <h2>Create New Event</h2>
      </div>
      <Form
        form={creatEventForm}
        //initialValues={{...formInitialValues}}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <div>
          <Form.Item
            label="Event Title"
            name="eventTitle"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div>
            <div className="mdl-ttl">Event Details</div>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Start Date & Time"
                  name="eventDateTime"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    // selected={eventDetail?.eventDateTime ? moment(eventDetail.eventDateTimeEnd , 'YYYY-MM-DD HH:mm') : moment()}
                    showTime={{
                      format: "HH:mm",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item
                  label="End Date & Time"
                  name="eventDateTimeEnd"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={disabledDate}
                    // selected={eventDetail?.eventDateTimeEnd ? moment(eventDetail.eventDateTimeEnd , 'YYYY-MM-DD HH:mm') : moment()}
                    showTime={{
                      format: "HH:mm",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div>
            <Form.Item label="Description">
              <SimpleEditor
                value={descValue}
                setValue={setDescValue}
                placeholder="Add here"
              ></SimpleEditor>
            </Form.Item>
          </div>
          <Row>
            <Col span={12}>
              <Form.Item label="Category" name="eventCatagory" rules={[{ required: true }]}>
                <Select
                style={{
                  width: "95%",
                }}
                  onFocus={() => setSubCategoryData([])}
                  onChange={(value) => {
                    creatEventForm.setFieldsValue({
                      eventSubCatagory: null
                    })
                    setSubCategoryData(
                      categoryData.filter((d) => d.categoryId === value)[0]
                        .subCategories
                    );
                  }}
                >
                  {categoryData.map((cat, i) => (
                    <Option key={`cat-${i}`} value={cat.categoryId}>
                      {cat.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sub-Category" name="eventSubCatagory"  rules={[{ required: true }]}>
                <Select>
                  {subCategoryData &&
                    subCategoryData.map((d, i) => (
                      <Option key={`subCat-${i}`} value={d.subCategoryId}>
                        {d.subCategoryName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Speaker (User-Id)" name="eventCreatedBy"  rules={[{ required: true }]}>
                <Input  style={{
                  width: "95%",
                }}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Language" name="eventLan"  rules={[{ required: true }]}>
                <Select>
                  <Option value="english">English</Option>
                  <Option value="hindi">Hindi</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <hr className="admin-hr" />

          <div>
            <div className="mdl-ttl">Event Mode</div>
            <Form.Item name="eventMode">
              <Radio.Group>
                <Radio value={"online"}>Online</Radio>
                <Radio value={"offline"}>Offline</Radio>
              </Radio.Group>
            </Form.Item>
            {eventMode === "online" && (
              <Form.Item>{renderEventAddMeeting()}</Form.Item>
            )}
            {eventMode === "offline" && (
              <Form.Item>{renderEventAddLocation()}</Form.Item>
            )}
          </div>
          <hr className="admin-hr" />

          <div>
            <div className="mdl-ttl">Event Reminder</div>

            <Form.Item name="eventSendType">
              <Radio.Group>
                <Radio value={"email"}>Email</Radio>
                <Radio value={"Sms"}>Sms</Radio>
                <Radio value={"both"}>Both</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Set Reminder" name="eventSetReminder">
              <Select
                style={{
                  width: "30%",
                }}
              >
                <Option value={15}>
                  15 min
                </Option>
                <Option value={30}>
                  30 min
                </Option>
                <Option value={45}>
                  45 min
                </Option>
                <Option value={60}>
                  60 min
                </Option>
              </Select>
            </Form.Item>
          </div>
          <hr className="admin-hr" />

          <div>
            <div className="mdl-ttl">Payment Mode</div>

            <Form.Item name="eventCostType">
              <Radio.Group>
                <Radio value={"Free"}>Free</Radio>
                <Radio value={"Paid"}>Paid</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <hr className="admin-hr" />

          <div>
            <div className="mdl-ttl">Guests</div>

            <Form.Item name="eventAttendiEmail" label="Add Guests"  rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <br />
            <small>
              Enter up to 10 email addresses, separated by a comma. We can’t
              send invitations to distribution lists.
            </small>
          </div>
          <hr className="admin-hr" />

          <div>
            <div className="mdl-ttl">
              Event Thumbnail <span>(Optional)</span>
            </div>
            <p className="mdl-para">
              The event should be in <b>JPEG, PNG</b> format. Recommended
              dimensions are <b>1920x1080 at 72 DPI,</b> smaller resolutions may
              result in a pixelated image. The file size limit is <b>2 MB.</b>
            </p>
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
          </div>

          <div className="col-12 text-end">
            <hr className="admin-hr" />
            <button className="btn-sach btn-sach-linear me-3" onClick={handleCancel}>
              <span>Cancel</span>
            </button>
            <button type="submit" className="btn-sach bg-sach-red">
              <span>Create</span>
            </button>
          </div>
        </div>
      </Form>
    </AdminModal>
  );
};

const mapStateToProps = (state) => {
  const { EventMgmtReducer, CategoryMgmtReducer, CommonReducer } = state;
  const { categoryData } = CategoryMgmtReducer;
  const { meetLink, zoomLink, teamsLink,thumbnailURL, eventDetail } = EventMgmtReducer;
  return {
    categoryData,
    meetLink,
    zoomLink,
    teamsLink,
    thumbnailURL,
    eventDetail,
    isUploadLoader: CommonReducer.isUploadLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateEvent: (data) => dispatch(handleCreateEvent(data)),
    handleGenerateEvent: (data) => dispatch(handleGenerateEvent(data)),
    getCategoryData: (data) => dispatch(getCategoryData(data)),
    resetKey: (data) => dispatch(resetKey(data)),
    handleUploadFile: (data) => dispatch(handleUploadFile(data)),
    getEventDetail: (data) => dispatch(getEventDetail(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventModal);
