import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    return (
        <Header
            style={{
                backgroundColor: '#001529',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                height: '64px',
            }}
        >
            <Title
                level={3}
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.0rem',
                    fontWeight: 700,
                    color: '#f0f0f0',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                }}
            >
                TechWave

            </Title>
        </Header>
    );
};

export default Navbar;
