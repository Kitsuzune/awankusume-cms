export const trackingColumns = [
    {
        title: 'Nama',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Serial-Code',
        dataIndex: 'serialCode',
        key: 'serialCode',
    },
    {
        title: 'Badan Usaha',
        dataIndex: 'badanUsaha',
        key: 'badanUsaha',
    },
    {
        title: 'Jenis Legalitas',
        dataIndex: 'jenisLegalitas',
        key: 'jenisLegalitas'
    },
    {
        title: 'Tanggal',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
        render: (text, record) => (
            <div className='cursor-pointer'>
                {text === 'FRONTEND_PAYMENT' ? 'PREPAID' : text}
            </div>
        ),
    },
];