import { extend } from "vee-validate";
import { passwordReg, phoneReg } from './regs'
// 定义表单校验规则
extend("phoneRequired", {
  validate(value) {
    return !!value;
  },
  message: "手机号不能为空", // 校验失败提示的错误信息
  computesRequired: true, // 必要的
});

extend("phone", {
  validate(value) {
    // console.log(value);
    return phoneReg.test(value);
  },
  message: "请输入合法手机号", // 校验失败提示的错误信息
});

extend("passwordRequired", {
  validate(value) {
    return !!value;
  },
  message: "密码不能为空",
  computesRequired: true
});


extend("password", {
  validate(value) {
    return passwordReg.test(value);
  },
  message: "请输入合法密码",
});