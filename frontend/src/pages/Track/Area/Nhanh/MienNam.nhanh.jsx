import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { MIEN_NAM_NHANH } from '../../../../utils/constant';
export default function MienNamNhanh({data}) {
	return (
		<div className="px-[22px] lg:px-[56px] py-[44px]">
			<div className="">
				<div className="grid grid-cols-1  lg:grid-cols-4  lg:gap-y-[30px]">
					{data.map((p) => (
						<div className="flex items-center py-[16px] border-b-2 lg:py-0 lg:border-0 border-[#F2F2F2]">
							<a
								className="text-lg font-normal text-[#232323]"
								href={p.url}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faLocationDot}
									className="text-[#ffbb0f]"
								/>
								<span className="ml-2">{p.name}</span>
							</a>
						</div>
					))}
				</div>
			</div>
			<div x-show="service2 =='mb'" style={{ display: 'none' }}>
				<div className="grid grid-cols-1  lg:grid-cols-4  lg:gap-y-[30px]"></div>
			</div>
		</div>
	);
}
