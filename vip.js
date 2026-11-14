

const KEY = "uhomecp_token";
const SHORTCUT = "保存Token"; // 快捷指令名称
const reg = /token|auth|session|sign|ticket/i;

const h = $request.headers || {};
const found = {};
for (const k in h) {
  if (reg.test(k)) found[k] = h[k];
}

if (Object.keys(found).length > 0) {
  const lines = Object.keys(found).map((k) => k + ": " + found[k]);
  const text = lines.join("\n");

  $prefs.setValueForKey(text, KEY);

  const url =
    "shortcuts://run-shortcut?name=" + encodeURIComponent(SHORTCUT) +
    "&input=text&text=" + encodeURIComponent(text);

  $notify("uhomecp Token 获取成功", "点击保存为 txt(覆盖)", text, {
    "open-url": url,
  });
} else {
  console.log("未找到 token 头,全部请求头:\n" + JSON.stringify(h, null, 2));
  $notify("uhomecp Token 获取失败", "", "请求头里没有匹配字段,请查看日志");
}

$done({});
