import {
    AlipayOutlined,
    GoogleCircleFilled,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import { useState } from 'react';
import { apiRequest } from '../../utils/api';

const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const Page = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [error, setError] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        try {
            const response = await apiRequest('post', '/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem('role', response.data.role);
                message.success('Login success');
                window.location.href = '/app/dashboard';
            }
        } catch (error) {
            setError({
                email: 'Email is Wrong',
                password: 'Password is Wrong',
            });
            // message.error('Login failed');
        }
    };



    const { token } = theme.useToken();
    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <LoginFormPage
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="AWAN KUSUMA"
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)',
                    backdropFilter: 'blur(4px)',
                }}
                subTitle="Admin CMS Login"
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
                            <span
                                style={{
                                    color: token.colorTextPlaceholder,
                                    fontWeight: 'normal',
                                    fontSize: 14,
                                }}
                            >
                                Other Login Method
                            </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <GoogleCircleFilled style={{ ...iconStyles, color: '#1677FF' }} />
                            </div>
                        </Space>
                    </div>
                }
                submitter={{
                    searchConfig: {
                        submitText: 'Login',
                    },
                    render: (_, dom) => (
                        <Button
                            type="primary"
                            onClick={handleLogin}
                            style={{
                                width: '100%',
                                backgroundColor: '#1677FF',
                                borderColor: '#1677FF',
                                color: '#fff',
                            }}
                        >
                            Login
                        </Button>
                    ),
                }}
            >
                <>
                    <ProFormText
                        name="email"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <UserOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={'Email'}
                        rules={[
                            {
                                required: true,
                                message: 'Email is required',
                            },
                        ]}
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        error={error.email}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <LockOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={'Password'}
                        rules={[
                            {
                                required: true,
                                message: 'Password is required',
                            },
                        ]}
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        error={error.password}
                    />
                </>

                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox 
                    noStyle 
                    name="autoLogin"
                    onChange={(e) => setData({ ...data, remember: e.target.checked })}
                    value={data.remember}
                    >
                        Remember me
                    </ProFormCheckbox>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default () => {
    return (
        <ProConfigProvider dark>
            <Page />
        </ProConfigProvider>
    );
};