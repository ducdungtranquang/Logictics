import { useState, useRef } from 'react'
import { Form, Input, DatePicker, Button, InputNumber } from 'antd'

const { Item } = Form
function EditCustomer({ isVisible, onClose, onOk, loading, disable, dataEdit }) {
    const form = useRef();

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Sửa thông tin khách</span>
                            <Button
                                size="large"
                                disabled={disable}
                                className={!disable && 'hover:bg-red-500 hover:border-red-700 hover:text-white border-none'}
                                onClick={onClose}
                            >
                                x
                            </Button>
                        </div>
                        <Form
                            ref={form}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                        >
                            <Item label="Tên khách hàng">
                                <Input defaultValue={dataEdit.name} />
                            </Item>
                            {/* <Item label="Cấp">
                                <Input defaultValue={dataEdit.address} />
                            </Item> */}
                            <Item label="Mô tả">
                                <Input defaultValue={dataEdit.description} />
                            </Item>
                            <Item label="Địa chỉ">
                                <Input defaultValue={dataEdit.address} />
                            </Item>
                            <Item label="Mã doanh nghiệp">
                                <Input defaultValue={dataEdit.companyTaxcode_business} placeholder="Dành cho doanh nghiệp" />
                            </Item>
                            <Item label="Loại khách hàng">
                                <select defaultValue={dataEdit.customer_type}>
                                    {/* <option value={dataEdit.customer_type}>{dataEdit.customer_type}</option> */}
                                    <option value="intermediary">Trung gian</option>
                                    <option value="business">Doanh nghiệp</option>
                                    <option value="passers">Vãng lai</option>
                                </select>
                            </Item>
                            <Item label="Doanh nghiệp">
                                <select defaultValue={dataEdit.accepted_business}>
                                    {/* <option value={dataEdit.accepted_business}>{dataEdit.accepted_business}</option> */}
                                    <option value="true">Có</option>
                                    <option value="false">Không</option>
                                </select>
                            </Item>

                            <Item label="Xếp hạng">
                                <select defaultValue={dataEdit.rank_passers.level}>
                                    {/* <option value={dataEdit.rank_passers.level}>{dataEdit.rank_passers.level}</option> */}
                                    <option value="titan">Titan</option>
                                    <option value="gold">Gold</option>
                                    <option value="silver">Silver</option>
                                    <option value="bronze">Bronze</option>
                                    <option value="unrank">Unrank</option>
                                </select>
                            </Item>

                            <Item label="Điểm khách hàng">
                                <InputNumber value={dataEdit.rank_passers.point}/>
                            </Item>
                            <div className='flex justify-end mt-2 text-sm gap-x-6'>
                                <Button
                                    size="large"
                                    disabled={disable}
                                    className={!disable && 'hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg'}
                                    onClick={onClose}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    loading={loading}
                                    onClick={onOk}
                                    className="rounded-lg"
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </Form>
                    </div>



                </div>
            }
        </>
    );
}

export default EditCustomer;