export const userListColumns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
    },
    {
        title: 'Nama',
        dataIndex: 'fullName',
        key: 'fullName',
        width: 200,
        render: (text, record) => (
            <div className='flex items-center'>
                <div className='ml-2'>{record.firstName} {record.lastName}</div>
            </div>
        ),
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: 150,
    },
    {
        title: 'Nomor Telpon',
        dataIndex: 'nomorTelp',
        key: 'nomorTelp',
        width: 200,
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
                    record.role === 'SUPER_ADMIN' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Super Admin
                            </div>
                        </div>
                    ) : record.role === 'ADMIN' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Admin
                            </div>
                        </div>
                    ) : record.role === 'MAKELAR' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Makelar
                            </div>
                        </div>
                    ) : record.role === 'CONTRIBUTOR' ? (
                        <div className="flex justify-center items-center">
                            <div className="bg-main text-center text-white px-2 py-1 rounded-md w-1/2 hover:bg-main/80 transition-all duration-300">
                                Contributor
                            </div>
                        </div>
                    ) : record.role === 'USER' ? (
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