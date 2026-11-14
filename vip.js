const KEY = "uhomecp_cookie";
const SHORTCUT = "保存Token"; // 快捷指令名称

const h = $request.headers || {};
const cookie = h["Cookie"] || h["cookie"];

if (cookie) {
  $prefs.setValueForKey(cookie, KEY);

  const url =
    "shortcuts://run-shortcut?name=" + encodeURIComponent(SHORTCUT) +
    "&input=text&text=" + encodeURIComponent(cookie);

  $notify("Cookie 获取成功", "点击保存为 txt(覆盖)", cookie, {
    "open-url": url,
  });
} else {
  console.log("未找到 Cookie:\n" + JSON.stringify(h, null, 2));
  $notify("uhomecp Cookie 获取失败", "", "请求头里没有 Cookie");
}

$done({});
