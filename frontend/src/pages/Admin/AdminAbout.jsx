import { Button, Checkbox, Form, Input, Upload } from "antd";
import { MainContext } from "../../context/MainContext";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./adminToken";
import { useEffect } from "react";
import { useRef } from "react";
import { END_POINT } from "../../utils/constant";


export default function AdminAbout() {
  const { accessToken } = useContext(MainContext);
  const form = useRef();
  const [checkLogo, setCheckLogo] = useState(false)
  const [checkBanners, setCheckBanners] = useState(false)
  const [description, setDes] = useState('');
  const [values, setValues] = useState('');
  const [vision, setVision] = useState('')
  const [fileListLogo, setLogo] = useState('')
  const [fileListBanners, setBanners] = useState([])
  const [aboutState, setAboutState] = useState({
    // description: "string",
    // vision: "string",
    // values: "string",
    // logo: "https://cdn.tgdd.vn/Files/2020/12/11/1312984/huong-dan-tra-cuu-van-don-j-t-express-nhanh-nhat-c-4-652x367.jpg",
    // banners: [
    //   "https://icdn.dantri.com.vn/thumb_w/640/2020/05/08/j-chuandocx-1588932311071.jpeg",
    //   "https://cdn.tgdd.vn/Files/2020/12/11/1312984/huong-dan-tra-cuu-van-don-j-t-express-nhanh-nhat-c-4-652x367.jpg",
    // ],
  });
  const callAboutData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/about`,
        method: "get",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setAboutState(result.data.data);
        console.log(aboutState);
        // setLogo(result.data.data.logo)
        // setBanners(result.data.data.banners)
        setValues(result.data.data.values)
        setVision(result.data.data.vision)
        setDes(result.data.data.description)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postApi = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiLogo = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/logo`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/banners`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callAboutData();
  }, []);


  const changeLogo = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    // setLogo(img)
    // console.log(img);
    setLogo(img);
    setCheckLogo(true)
  }

  const changeBanners = e => {
    const files = e.target.files;
    const banners = fileListBanners.slice()
    for (const file of files) {
      file.preview = URL.createObjectURL(file)
      banners.push(file)
    }
    // console.log(fileListBanners);
    setBanners(banners)
    setCheckBanners(true)
  }

  const handleDel = (e) => {
    let index = e.target.parentElement.parentElement.id
    const files = fileListBanners.slice(0, fileListBanners.length);
    files.splice(index, 1)
    console.log(files);
    setBanners(files);
  }

  const handleSubmit = () => {
    const items = {
      description: description,
      values: values,
      vision: vision,
    }
    if (checkBanners === false || checkLogo === false) {
      postApi(items)
      alert("Cập nhật thành công")
    }

    else {
      let fileBanners = new FormData();
      fileListBanners.forEach(e => {
        fileBanners.append("banners", e)
      })

      let valueLogo = new FormData();
      valueLogo.append("logo", fileListLogo)
      postApi(items)
      postApiBanner(fileBanners);
      postApiLogo(valueLogo);
      // console.log(valueLogo);
      // console.log(fileListLogo);
      // callAboutData()
      alert("Cập nhật thành công")
    }
  }

  return (
    <>
      <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>Về Chúng Tôi</h1>
      <Form
        style={{ margin: "auto" }}
        ref={form}
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
      >

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="ID">
          {aboutState && (
            <Input.TextArea style={{ fontWeight: "500" }} value={aboutState._id} rows={2} disabled='true' />
          )}
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Mô tả">
          <Input.TextArea style={{ fontWeight: "500" }} value={description} rows={2} onChange={(e) => setDes(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Tầm nhìn">
          <Input.TextArea style={{ fontWeight: "500" }} value={vision} rows={2} onChange={(e) => setVision(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Giá trị">
          <Input.TextArea style={{ fontWeight: "500" }} value={values} rows={2} onChange={(e) => setValues(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Logo">
          <input type='file' onChange={changeLogo} />
          <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
            {fileListLogo !== "" ? (
              <img src={fileListLogo.preview} alt={fileListLogo.name} />
            ) : (<><img src={`${END_POINT}/public/${aboutState.logo}`} alt={fileListLogo.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banners">
          <input type="file" id="file-upload" multiple required onChange={changeBanners} />
          {fileListBanners.length > 0 ? (
            <>
              {fileListBanners.map((e, index) => (
                <div className="peer hover:bg-gray-300 flex align-center" style={{ position: "relative", width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                  <div id={index} className="peer-hover:flex" style={{ position: 'absolute', right: 3, cursor: "pointer" }}>
                    <DeleteOutlined className="hover:bg-gray-100" onClick={handleDel} />
                  </div>
                  <img src={e.preview} className="peer" />
                </div>
              ))}
            </>
          ) : (
            <>
              {aboutState.banners && (
                <>
                  {aboutState.banners.map((e, index) => (
                    <div className="peer hover:bg-gray-300 flex align-center" style={{ position: "relative", width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                      <div id={index} className="peer-hover:flex" style={{ position: 'absolute', right: 3, cursor: "pointer" }}>
                        <DeleteOutlined className="hover:bg-gray-100" onClick={handleDel} />
                      </div>
                      <img src={`${END_POINT}/public/${e}`} className="peer" alt={e} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
          wrapperCol={{
            offset: 10,
            // span: 20,
          }}
        >
          <Button
            type="primary"
            style={{
              color: "",
              padding: "16",
              display: "flex",
              alignItems: 'center',
              fontWeight: "bold"
            }}
            htmlType="submit"
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
