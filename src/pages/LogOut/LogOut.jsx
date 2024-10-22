import { message } from 'antd';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/api';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await apiRequest('post', '/auth/logout');
                console.log(response);
                message.success('Logout Success');
                localStorage.removeItem('role');
                navigate('/web/login');
            } catch (error) {
                console.log(error);
            }
        };
        logout();
    }, []);

    return null;
}

export default LogOut