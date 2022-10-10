import { useState } from 'react'
import { Form, Input, DatePicker, Button, InputNumber, Select } from 'antd'

const { Item } = Form
const { Option } = Select;
function AdminEditMessage({ isVisible, onClose, onOk, loading, disable, data }) {

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Sửa Order</span>
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
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                        >
                            {/* <Item label="Người nhận">
                                <Input defaultValue={data.receiver} />
                            </Item>
                            <Item label="Xuất phát">
                                <Input defaultValue={data.origin} />
                            </Item>
                            <Item label="Điểm đến">
                                <Input defaultValue={data.destination} />
                            </Item> */}
                            <Item label="Tình trạng">
                                
                                    <select defaultValue={data.status} style={{padding:'5px'}}>
                                        <option value="unseen">unseen</option>
                                        <option value="seen">seen</option>
                                    </select>
                                
                            </Item>
                            {/* <Item label="Thiết bị">
                                <Input disabled={true} defaultValue={data.service} />
                            </Item>
                            <Item label="Tổng giá tiền">
                                <InputNumber defaultValue={data.total_price} />
                            </Item> */}
                            {/* <Item label="Sản phẩm">
                                <Button>Tách</Button>
                                <div>{data.product.map(e => (
                                    <li>Lô hàng {e.bill}</li>
                                ))}</div>
                            </Item> */}
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

export default AdminEditMessage;