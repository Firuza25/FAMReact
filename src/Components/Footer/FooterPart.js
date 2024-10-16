import React from "react";
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import withFooter from "./withFooter";

const { Footer } = Layout;
const { Text } = Typography;

const FooterTemp = () => {
    return (
        <div>
            <Footer style={{ backgroundColor: '#001529', color: 'white', padding: '20px' }}>
            <Row justify="space-between">
                <Col>
                    <Text style={{ color: 'white' }}>© {new Date().getFullYear()} EventsLive. All rights reserved.</Text>
                </Col>
                <Col>
                    <Space size="large">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                            <FacebookOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                            <TwitterOutlined />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
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