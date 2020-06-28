import React from "react";
import { Spin } from "antd";

export default ({ size = "default", loading = true, children = null, ...props }) => {
  return (
    <Spin size={size} spinning={loading} {...props}>
      <div style={{ width: "100%", height: "100%", minHeight: 400 }}>{children}</div>
    </Spin>
  );
};
