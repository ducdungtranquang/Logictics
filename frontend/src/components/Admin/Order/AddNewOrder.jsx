import { useState } from 'react'
import { Form, Input, DatePicker, Button, InputNumber } from 'antd'

const { Item } = Form
function AddNewOrder({ isVisible, onClose, onOk, loading, disable }) {

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Thêm Order</span>
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
                            <Item label="Người nhận">
                                <Input />
                            </Item>
                            <Item label="Xuất phát">
                                <Input />
                            </Item>
                            <Item label="Điểm đến">
                                <Input />
                            </Item>
                            <Item label="Tình trạng">
                                <select defaultValue="waiting" style={{padding:'5px'}}>
                                    <option value="waiting">waiting</option>
                                    <option value="accepted">accepted</option>
                                    <option value="probably proceed">probably proceed</option>
                                    <option value="processing">processing</option>
                                    <option value="completed">completed</option>
                                    <option value="refused">refused</option>
                                    <option value="cancel">cancel</option>

                                </select>
                            </Item>
                            <Item label="Thiết bị">
                                <Input />
                            </Item>
                            {/* <Item label="Tổng giá tiền">
                                <InputNumber />
                            </Item> */}
                            <Item label="Email khách hàng">
                                <Input />
                            </Item>
                            <Item label="Số điện thoại">
                                <InputNumber />
                            </Item>
                            {/* <Item label="Sản phẩm">
                                <Button>Tách</Button>
                               <div><li>Lô hàng số 1</li></div>
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

export default AddNewOrder;