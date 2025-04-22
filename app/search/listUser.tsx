import Image from 'next/image';
const ListUser = () => {
    return(
        <div className='flex flex-col gap-2'>
            <div className="flex flex-row items-center gap-2 border-b p-2 border-gray-300">
                <div className="logo border border-gray-300 rounded-full h-[50px] w-[50px] cursor-pointer">
                    <Image
                        src="/2e98d8b6-a483-405a-88d9-67171f71b379.jpg"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer rounded-full"
                    />
                </div>
                <div className="font-bold max-w-[128px] overflow-hidden">aaaaaa</div>
            </div>
            <div className="flex flex-row items-center gap-2 border-b p-2 border-gray-300">
                <div className="logo border border-gray-300 rounded-full h-[50px] w-[50px] cursor-pointer">
                    <Image
                        src="/2e98d8b6-a483-405a-88d9-67171f71b379.jpg"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer rounded-full"
                    />
                </div>
                <div className="font-bold max-w-[128px] overflow-hidden">aaaaaa</div>
            </div>
            <div className="flex flex-row items-center gap-2 border-b p-2 border-gray-300">
                <div className="logo border border-gray-300 rounded-full h-[50px] w-[50px] cursor-pointer">
                    <Image
                        src="/2e98d8b6-a483-405a-88d9-67171f71b379.jpg"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="cursor-pointer rounded-full"
                    />
                </div>
                <div className="font-bold max-w-[128px] overflow-hidden">aaaaaa</div>
            </div>
        </div>
    )
}
export default ListUser