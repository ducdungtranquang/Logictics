import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import { END_POINT } from "../../utils/constant";

const RecruitForm = ({ id }) => {

    const [name, setName] = useState('');
    const [ho, setHo] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setmessage] = useState('');
    const [validationMsg, setValidationMsg] = useState({});
    const [file, setFile] = useState(null);
    const [option, setOption] = useState('');
    const [inform,setInform]= useState("")

    const validateAll = () => {
        const msg = {};
        if (isEmpty(email)) {
            msg.email = 'Vui lòng nhập email của bạn !';
        } else if (!isEmail(email)) {
            msg.email = 'Email không hợp lệ';
            setInform("")
        }

        if (isEmpty(name)) {
            msg.name = 'Vui lòng nhập họ và tên ';
            setInform("")
        }

        if (isEmpty(ho)) {
            msg.ho = 'Vui lòng nhập họ và tên ';
            setInform("")
        }

        if (isEmpty(phone)) {
            msg.phone = 'Vui lòng nhập số điện thoại ';
            setInform("")
        }

        if (isEmpty(message)) {
            msg.message = 'Vui lòng nhập tin nhắn của bạn ';
            setInform("")
        }

        if (file === null) {
            msg.file = 'Vui lòng gửi file CV của bạn ';
            setInform("")
        }

        if (isEmpty(option)) {
            msg.option = 'Vui lòng điền nguồn của bạn ';
            setInform("")
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const postData = async (data, id) => {
        try {
            const res = await axios({
                url: `${END_POINT}/applicant/${id}`,
                method: "post",
                data: data,
                // headers: { authorization: `Bearer ${accessToken}` },
            })
            if(res.status===200){
                setInform("Nộp đơn ứng tuyển thành công")
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;

        const formData = new FormData();
        formData.append("firstName", ho);
        formData.append("lastName", name);
        formData.append("phoneNumber", phone);
        formData.append("email", email);
        formData.append("source", option);
        formData.append("message", message);
        formData.append("status", "pending");
        formData.append("file", file);
        postData(formData, id);

        await setTimeout(() => {
            setName('');
            setEmail('');
            setPhone('');
            setmessage('');
            setHo('');
            setOption('');
        }, 2000)
    };

    return (
        <Formik className="p-[10px]">
            {() => {
                return (
                    <div className="bg-[#fff] p-3 sm:p-7 lg:p-14 w-[90%] lg:w-auto rounded-lg absolute top-[50%] left-[50%]  translate-y-[-50%]  translate-x-[-50%] mt-[90px]">
                        <h3 className="mb-2 text-3xl font-bold lg:mb-5">Đăng ký ứng tuyển</h3>
                        <Form onSubmit={handleSubmit} className="gap-4 lg:grid lg:grid-cols-2">
                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="name">Họ</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    id="name"
                                    type="text"
                                    name=""
                                    value={ho}
                                    placeholder="Họ"
                                    onChange={(e) => setHo(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.ho}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="name">Tên</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    id="name"
                                    type="text"
                                    name=""
                                    value={name}
                                    placeholder="Tên"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.name}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="email">Email *</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    type="email *"
                                    name="email"
                                    id="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.email}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="phone">Số điện thoại *</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    value={phone}
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.phone}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="phone">Biết đến qua</Label>
                                <select style={{ padding: 5, }} onChange={(e) => setOption(e.target.value)}>
                                    <option value="">Biết đến qua nguồn</option>
                                    <option value="staff">Nhân viên</option>
                                    <option value="friend">Bạn bè</option>
                                    <option value="phone">Điện thoại</option>
                                    <option value="email">Email</option>
                                    <option value="linkedin">Linkedin</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="search">Tìm kiếm</option>
                                    <option value="other">Khác</option>
                                </select>
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.option}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="message">Thông điệp</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    type="text"
                                    value={message}
                                    placeholder="Thông điệp"
                                    onChange={(e) => setmessage(e.target.value)}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.message}</p>
                            </FormGroup>

                            <FormGroup className="flex flex-col mb-0 lg:mb-3">
                                <Label for="phone">CV *</Label>
                                <Input
                                    className="py-2 border placeholder:pl-2 xl:w-[210px] lg:w-[185px]"
                                    type="file"
                                    name="file"
                                    id="file"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <p className="mt-2 text-sm text-red-400 ">{validationMsg.file}</p>
                            </FormGroup>

                            <FormGroup className=" col-span-full">
                                <button type="submit" className="w-[100%] bg-[#e5a663] py-2 sm:mt-5 rounded-lg">
                                    Gửi đăng ký ứng tuyển
                                </button>
                                <p className="mt-2 text-xl text-green-400 text-center p-[3px]">{inform}</p>
                            </FormGroup>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default RecruitForm;
