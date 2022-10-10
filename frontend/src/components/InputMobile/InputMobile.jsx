import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputMobile = ({onSearch,onChangeKey}) => {
    return (
        <div>
            <div className="px-[16px] w-[100%] flex items-center  lg:hidden mt-6 pb-[30px]">
                <input
                    className="border p-[8px] w-[100%]"
                    type="text"
                    name=""
                    id=""
                    placeholder="Nhập vị trí ứng tuyển"
                    onChange={onChangeKey}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-2 border p-[12px] " 
                onClick={onSearch}/>
            </div>
        </div>
    );
};

export default InputMobile;
