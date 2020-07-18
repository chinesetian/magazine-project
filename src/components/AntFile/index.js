/*
 * @Author: welson
 * @Date: 2019-08-16 15:39:23
 * @Last Modified by:   welson
 * @Last Modified time: 2019-08-16 15:39:23
 */

/**
 *  @desc 单个文件上传(自由控制文件类型)
 *  @params {string}    className   组件外层类名
 * 
 *  @params {number|boolean}    maxSize     文件大小限制，默认2, 即2M, 为 false 是不限制大小
 *  @params {string}    sizeErrorMessage  文件大小超出限制时的错误提示
 * 
 *  @params {string}    accept      文件类型，默认 "image/png, image/jpeg, image/jpg"
 *  @params {string}    typeErrorMessage  上传类型不对的错误提示
 * 
 *  @params {string}    uploadType  上传类型 默认remote, local返回base64, remote返回 customUpload 回调
 *  @params {function}  beforeUpload  准备上传之前的回调
 *  @params {function}  customUpload  自定义上传
 *  @params {boolean}  imageCompress  是否压缩，如上传excel时，这个参数为false

 *  @params {object}    extraProps  antd 的 Upload可接受的额外参数
 *  @params {ReactElement}   children  接受子组件
 */

// 存永久： logo、头像、布控照片、视图库图片、视频截图
// 临时：以图搜图、

import React from "react";
import { Upload, message } from 'antd'
import Compressor from "compressorjs";

const { Utils } = window;

/* 
  配置参数
  {
    disabled,
    expiretype : 周期类型，0表示永久，1表示7天，2表示30天，3表示90天，默认为0
    name:  发到后台的文件参数名,默认file
  }
*/

// 默认上传的格式
const ACCEPT_FILE = "*";
// const ACCEPT_FILE = "image/jpeg,image/jpg";
const MAX_SIZE = 500;

class AntFile extends React.Component {

  imageCompress(file, options = { quality: 0.8 }) {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        ...options,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }

  // file转化为本地base64
  uploadLocal = async file => {
    const { customUpload } = this.props;
    const base64 = await Utils.fileToBase64(file);
    file.url = base64;
    file.uploadType = "local";
    customUpload && customUpload(file);
  };

  // 图片上传到远程服务器
  uploadRemote = file => {
    const { customUpload } = this.props;
    customUpload && customUpload(file);

  };

  /** 自定义上传方法
   *
   */
  customUpload = async ({ file }) => {
    const { uploadType = "remote", imageCompress=false } = this.props;
    let newFile = file;
    if (file.type !== "image/svg+xml" && imageCompress) {
      newFile =this.imageCompress(file);
    }
    if (uploadType === "remote") {
      this.uploadRemote(newFile);
    } else {
      this.uploadLocal(newFile);
    }
  };

  /** 上传之前的钩子函数,做一些上传校验
   * @return 返回false时停止上传，返回true则执行上传（customUpload）
   */
  beforeUpload = file => {
    const { maxSize = MAX_SIZE, accept = ACCEPT_FILE, typeErrorMessage, sizeErrorMessage, beforeUpload } = this.props;
    // 格式不做限制
    // const acceptTypes = accept.split(",");
    // const acceptable = acceptTypes.includes(file.type);
    let acceptable = true
    // if (!acceptable) {
    //   message.error(typeErrorMessage || "图片格式必须为JPG或者PNG!");
    // }
    const limitSize = maxSize ? file.size / 1024 / 1024 < maxSize : true;
    if (!limitSize) {
      message.error(sizeErrorMessage || `图片大小不能超过${maxSize}M!`);
    }
    const fileSize = file.size;
    if(!fileSize) {
      message.error(`${file.name}:文件错误!`)
    }
    if (acceptable && limitSize && fileSize) {
      beforeUpload && beforeUpload(file);
    }
    return acceptable && limitSize;
  };

  render() {
    const { accept = ACCEPT_FILE, children = null, ...rest } = this.props;
    const uploadProps = {
      accept,
      name: "file",
      multiple: false,
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      customRequest: this.customUpload
    };
    return (
      <Upload  {...uploadProps}{...rest}>
        {children}
      </Upload>
    );
  }
}

export default AntFile;
