import { extend } from "vee-validate";
import { codeReg } from '../../utils/regs'
import '../../utils/commonValidate'

extend("rePasswordRequired", {
  validate(value) {
    return !!value;
  },
  message: "确认密码不能为空",
  computesRequired: true
});

extend("rePassword", {
  validate(rePassword, { password }) {
    // console.log(args);
    // 获取到密码
    return rePassword === password;
  },
  message: "两次密码输入不一致",
  params: ["password"], // 声明接受参数
});

extend("codeRequired", {
  validate(value) {
    return !!value;
  },
  message: "手机验证码不能为空",
  computesRequired: true
});


extend("code", {
  validate(value) {
    return codeReg.test(value);
  },
  message: "验证码输入不正确",
});

extend("verify", {
  validate(value) {
    return value;
  },
  message: "请同意用户协议",
  computesRequired: true
});