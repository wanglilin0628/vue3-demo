/**
 * 公共功能：通知弹窗
 */
import { ElNotification } from 'element-plus'

export function useNotification() {
/**
 * 操作成功的通知弹窗
 * @param {String} title 通知弹窗标题
 * @param {String} message 通知弹窗内容
 */
  const successNotification = function(title, message) {
    ElNotification.success({
      title: title,
      message: message,
      duration: 1500
    })
  }

  const failNotification = function(title, message) {
    ElNotification.error({
      title: title,
      message: message,
      duration: 1000
    })
  }

  return {
    successNotification,
    failNotification
  }
}
