import React from 'react';
import Logo from '../../assets/images/logo.svg';
import lifeInJT from '../../assets/images/lijt1.png';
import { faCity, faAward, faFutbolBall, faHeart, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LifeInJTDetail = () => {
    return (
        <div className="m-auto max-w-[1140px]  px-[16px] lg:px-[0px]">
            <div className="lg:gap-x-16 lg:grid lg:grid-cols-2 my-[60px]">
                <div className="tracking-wide">
                    <h3 className="text-[32px] font-bold mb-4">Cuộc sống J&T</h3>
                    <h5 className="text-base text-[#e5a663] font-bold">
                        Tại J&T Express, mỗi cá nhân là một “mảnh ghép" quan trọng tạo nên bức tranh đa sắc màu.
                    </h5>
                    <p className="mb-8">
                        Chúng ta tự hào được tập hợp lại thành một đội ngũ thạo kỹ năng, chuẩn thái độ, cùng với phong
                        cách sống hiện đại và hết mình. Với tinh thần đoàn kết và sẵn sàng giúp đỡ lẫn nhau, chúng ta
                        đang gây dựng một nếp văn hóa làm việc tích cực, sẵn sàng vươn xa, dẫn đầu và lan tỏa đến nhiều
                        thế hệ tương lai.
                    </p>
                    <h4 className="flex gap-2 mb-4 text-xl font-bold">
                        Chân dung đồng đội tại <img src={Logo} alt="" />
                    </h4>
                    <div className="gap-2 mb-4 font-bold tracking-wide md:grid md:grid-cols-2 ">
                        <div className="box-content flex items-center gap-4 p-4 border rounded-lg">
                            <FontAwesomeIcon icon={faAward} className="text-4xl text-[#e5a663] border rounded-lg p-2" />
                            Đảm việc công <br /> Giỏi việc tư
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg ">
                            <FontAwesomeIcon
                                icon={faFutbolBall}
                                className="text-4xl text-[#e5a663] border rounded-lg p-2"
                            />
                            Làm hết mình <br />
                            Chơi hết sức
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <FontAwesomeIcon icon={faHeart} className="text-4xl text-[#e5a663] border rounded-lg p-2" />
                            Trung thực và trách nhiệm
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <FontAwesomeIcon
                                icon={faChartLine}
                                className="text-4xl text-[#e5a663] border rounded-lg p-2"
                            />
                            Sáng tạo và chủ động
                        </div>
                    </div>
                    <h4 className="flex gap-2 mb-4 text-xl font-bold">
                        <FontAwesomeIcon icon={faCity} className="text-[#e5a663]" /> Trụ sở chính
                    </h4>
                    <p>Sofic Tower , 10 Mai Chí Thọ, P. Thủ Thiêm, Thành phố Thủ Đức, TP. HCM</p>
                </div>

                <div>
                    <img src={lifeInJT} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LifeInJTDetail;
