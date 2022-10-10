import { useState } from 'react'
import { Form, Input, DatePicker, Button, InputNumber } from 'antd'

const { Item } = Form
function EditBill({ isVisible, onClose, onOk, loading, disable, data }) {

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center' style={{overflow:"scrollY"}}>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Cập nhật Hóa Đơn</span>
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
                                <Input defaultValue={data.road} />
                            </Item>
                            <Item label="ID Xe">
                                <Input defaultValue={data.car} />
                            </Item>
                            <Item label="ID Lái xe">
                                <Input defaultValue={data.driver}/>
                            </Item>
                            <Item label="Trạng thái">
                                <select defaultValue={data.status}>
                                    <option value="processing">Đang tiến hành</option>
                                    <option value="waiting">Đang chờ</option>
                                    <option value="completed">Hoàn thành</option>
                                </select>
                            </Item>

                            {/* <Item label="Xăng thực tế">
                                <InputNumber defaultValue={data.actual_fuel}/>
                            </Item>
                            <Item label="Xăng ước tính">
                                <InputNumber defaultValue={data.theoretical_fuel} />
                            </Item> */}

                            <Item label="Thiết bị">
                                <Input defaultValue={data.service}/>
                            </Item>
                            {/* <Item label="Mã lô sản phẩm">
                                {data.product_shipments.map(e=>(
                                    <Input defaultValue={e.shipment}/>
                                ))}
                            </Item>
                            
                            <Item label="Doanh số">
                            {data.product_shipments.map(e=>(
                                    <>
                                    <InputNumber defaultValue={e.turnover}/><br/>
                                    </>
                                    
                                ))}
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

export default EditBill;