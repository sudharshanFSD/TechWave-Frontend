import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = () => {
    return (
        <Footer
            style={{
                backgroundColor: '#001529',
                color: '#f0f0f0',
                textAlign: 'center',
                padding: '10px 20px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                letterSpacing: '1px',
            }}
        >
            <Text style={{ color: '#f0f0f0', fontWeight: '500' }}>
                © {new Date().getFullYear()} TechWave. All rights reserved.
            </Text>
        </Footer>
    );
};

export default FooterComponent;
