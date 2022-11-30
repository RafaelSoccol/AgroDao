import React from "react";
import { Menu, Dropdown } from "antd";
import { connect } from 'react-redux'
import { 
  LogoutOutlined, UserOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';

const menuItem = []

export const NavProfile = ({ signOut, user }) => {
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <UserOutlined style={{ fontSize: 45}} />
          <div className="pl-3">
            <h4 className="mb-0">{user.name}</h4>
            <span className="text-muted">{user.role}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sair</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <UserOutlined className="nav-icon mr-0" />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

const mapStateToProps = ({ user }) => {
  return { user: {...user} }
};

export default connect(mapStateToProps, {signOut})(NavProfile)
