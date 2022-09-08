/*
 * @Author: hanjing
 * @Date: 2022-08-30 09:53:41
 * @LastEditTime: 2022-08-30 16:08:00
 */
export const isObject = (value) => {
  return (
    value != null && (typeof value == 'object' || typeof value == 'function')
  )
}
