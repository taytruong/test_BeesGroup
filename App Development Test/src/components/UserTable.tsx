import React, { Key, useState } from "react";
import { TUser } from "../model/User";
import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Switch,
  Popconfirm,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  data: TUser[];
  onEdit?: (user: TUser) => void;
  onDelete?: (id: string) => void;
}

export default function UserTable({ data, onEdit, onDelete }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<TUser | null>(null);
  const [form] = Form.useForm();

  const showEditModal = (user: TUser) => {
    setEditingUser(user);
    try {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        balance: user.balance,
        active: user.active,
      });
      setIsModalVisible(true);
    } catch (err) {
      console.error("err:", err);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        const updatedUser: TUser = {
          ...editingUser,
          name: values.name,
          email: values.email,
          balance: Number(values.balance),
          active: values.active,
        };
        onEdit?.(updatedUser);
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const alphabetFilters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(
    (letter) => ({
      text: letter,
      value: letter,
    })
  );

  const columns: ColumnsType<TUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: TUser, b: TUser) => a.name.localeCompare(b.name),
      filters: alphabetFilters,
      onFilter: (value: boolean | Key, record: TUser) =>
        record.name.toUpperCase().startsWith(value as string),
    },
    {
      title: "Balance ($)",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => `$${value.toLocaleString("en-US")}`,
      sorter: (a: TUser, b: TUser) => a.balance - b.balance,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
    },
    {
      title: "Registration",
      dataIndex: "registerAt",
      key: "registerAt",
      render: (value: Date) => (
        <span
          style={{ cursor: "pointer" }}
          title={value ? value.toLocaleString("vi-VN") : ""}
        >
          {value ? value.toISOString().split("T")[0] : ""}
        </span>
      ),
      sorter: (a: TUser, b: TUser) =>
        (a.registerAt?.getTime() || 0) - (b.registerAt?.getTime() || 0),
    },
    {
      title: "STATUS",
      dataIndex: "active",
      key: "active",
      render: (value: boolean) => (value ? "Active" : "Inactive"),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value: boolean | Key, record: TUser) =>
        record.active === value,
    },
    {
      title: "ACTION",
      key: "action",
      render: (record: TUser) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              onDelete?.(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: true, y: 700 }}
      />
      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="balance"
            label="Balance"
            rules={[{ required: true, message: "Please input the balance!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item name="active" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
