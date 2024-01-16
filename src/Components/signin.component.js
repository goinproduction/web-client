import React, { useMemo } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { signInWithGoogle } from "../firebase";
import Axios from "axios";
import Cookies from "universal-cookie";

const SignIn = () => {

    const Context = React.createContext({ name: 'Default' });
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        Axios.post(`http://localhost:5000/users/login`, values)
            .then(res => {
                const token = new Cookies();
                token.set('token', res.data.token, { path: '/', maxAge: 604800 })
                window.location = "/";
            })
            .catch(() => {

                api.error({
                    message: 'Error',
                    description: (
                        <Context.Consumer>{() => `Something went wrong. Please try again.`}</Context.Consumer>
                    ),
                    placement: 'topRight',
                    duration: 2,
                });
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <div className='form-center'>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <img
                        className='signup__logo'
                        src='https://cdn.dribbble.com/userupload/4738234/file/original-447a4c7fb766f8b3ac2bd0e18cdf700c.gif'
                        alt='class_room_logo'
                    />
                    <h1 style={{ width: 500, marginLeft: 30 }}>
                        Login to Google Classroom
                    </h1>
                </div>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: 500 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Login
                        </Button>
                        <div>
                            <span style={{ "cursor": "pointer" }} onClick={signInWithGoogle}>
                                Login with Google
                                <img
                                    style={{ marginLeft: 10 }}
                                    width={20}
                                    height={20}
                                    src='https://cdn.iconscout.com/icon/free/png-512/google-470-675827.png'
                                    alt='google_logo' />
                            </span>
                        </div>
                        <p>
                            <span>
                                If you do not have an account yet, please{' '}
                                <Button type='default' onClick={() => window.location = "/register"}>
                                    Register
                                </Button>
                            </span>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </Context.Provider>
    );
};

export default SignIn;
