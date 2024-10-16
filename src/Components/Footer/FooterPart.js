import React from "react";
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import withFooter from "./withFooter";

const { Footer } = Layout;
const { Text } = Typography;

const FooterTemp = () => {
    return (
        <div>
            <Footer style={{ backgroundColor: '#faf3c5', color: '#8f0b0b', padding: '40px', }}>
            <Row justify="space-between">
                <Col>
                    <Text style={{ color: '#8f0b0b' }}>© {new Date().getFullYear()} NextEvent</Text>
                </Col>
                <Col>
                    <Space size="large">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#8f0b0b' }}>
                            <FacebookOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#8f0b0b' }}>
                            <TwitterOutlined />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#8f0b0b' }}>
                            <InstagramOutlined />
                        </a>
                    </Space>
                </Col>
            </Row>
        </Footer>
        </div>
        
    );
}

const FooterPart = withFooter(FooterTemp)
export default FooterPart