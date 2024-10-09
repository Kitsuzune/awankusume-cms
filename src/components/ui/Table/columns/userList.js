export const userListColumns = [
    {
        title: '#',
        dataIndex: 'number',
        key: 'number',
        width: 100,
    },
    {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: 300,
        align: 'center',
        render: (text, record) => (
            <>
                {/* {record.status ? <Tag color="green">Show</Tag> : <Tag color="red">Hide</Tag>}
                {record.status ?
                    // <Tag color="green">Show</Tag> 
                    <div className='flex justify-center items-center cursor-pointer'>
                        <div className='bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300'>
                            Show
                        </div>
                    </div>
                    :
                    // <Tag color="red">Hide</Tag>
                    <div className='flex justify-center items-center cursor-pointer'>
                        <div className='bg-second text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-second/80 transition-all duration-300'>
                            Hide
                        </div>
                    </div>
                } */}
                {
                    record.role === 'superadmin' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Super Admin
                            </div>
                        </div>
                    ) : record.role === 'admin' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Admin
                            </div>
                        </div>
                    ) : record.role === 'makelar' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Makelar
                            </div>
                        </div>
                    ) : record.role === 'contributor' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Contributor
                            </div>
                        </div>
                    ) : record.role === 'user' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                User
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Unknown
                            </div>
                        </div>
                    )
                }
            </>
        ),
    },
]