import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const items = [
//   getItem("User Management", "1", <UserOutlined />),
//   getItem("Movie Management", "2", <DesktopOutlined />),
// ];

const items = [
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/user-management"
        rel="noopener noreferrer"
      >
        User Management
      </Link>
    ),
    key: "user-management",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link
        style={{ textDecoration: "none" }}
        to="/admin/movie-management"
        rel="noopener noreferrer"
      >
        Movie Management
      </Link>
    ),
    key: "movie-management",
    icon: <DesktopOutlined />,
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            paddingRight: "10px",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Cinema Management
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
