import { useState } from 'react'
import { Form, Input, DatePicker, Button, InputNumber } from 'antd'

const { Item } = Form
function AddNewBill({ isVisible, onClose, onOk, loading, disable }) {

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Thêm Hóa Đơn</span>
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
                            <Item label="Mã đường đi">
                                <Input />
                            </Item>
                            <Item label="ID Xe">
                                <Input />
                            </Item>
                            <Item label="ID Lái xe">
                                <Input />
                            </Item>
                            <Item label="Trạng thái">
                               <select>
                                <option value="processing">Đang tiến hành</option>
                                <option value="waiting">Đang chờ</option>
                                <option value="completed">Hoàn thành</option>
                               </select>
                            </Item>
                            <Item label="Xăng dự tính">
                                <InputNumber />
                            </Item>
                            <Item label="Xăng thực tế">
                                <InputNumber />
                            </Item>
                            {/* <Item label="Doanh số">
                                <Input />
                            </Item> */}
                            <Item label="ID Thiết bị">
                                <Input />
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

export default AddNewBill;