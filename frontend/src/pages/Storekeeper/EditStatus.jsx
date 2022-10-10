import { useState } from 'react'
import { Form, Button, Select } from 'antd'

const { Item } = Form
const { Option } = Select
function EditStatus({ onClose, data, refetchData }) {
    const [editData, setEditData] = useState(data)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)

    const acceptEditStatus = async () => {
        setLoading(true)
        setDisable(true)
        try {
            setTimeout(() => {  //sẽ thay bằng PUT request
                setLoading(false)
                setDisable(false)
                onClose()
                refetchData()
            }, 2000)
        }
        catch {
            //code
        }

    }
    return (
        <>
            <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                <div className='relative w-2/3 flex flex-col bg-white p-6 gap-y-6 animate-modal_in mx-4 rounded-xl overflow-auto'>
                    <div className='flex justify-between items-center gap-y-3'>
                        <span className='text-xl uppercase font-bold h-fit'>Chỉnh sửa trạng thái</span>
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
                        <Item label="Trạng thái">
                            <Select
                            // value={editData.status}
                            onChange={value=>setEditData({
                                ...editData,
                                status:value
                            })}
                            >
                                <Option value='Duyệt'>Hoàn thành</Option>
                                <Option value='Loại'>Đang giao</Option>
                                <Option value='Đang đợi'>Đang đợi</Option>
                            </Select>
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
                                onClick={acceptEditStatus}
                                className="rounded-lg"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default EditStatus;