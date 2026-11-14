const KEY = "uhomecp_cookie";
const FILE = "uhomecp_token.txt";

const h = $request.headers || {};
const cookie = h["Cookie"] || h["cookie"];
if (cookie) {
  $prefs.setValueForKey(cookie, KEY);
  $notify("Cookie 已更新", "", cookie.slice(0, 60) + "...");
} else {
  console.log("未找到 Cookie:\n" + JSON.stringify(h, null, 2));
  $notify("uhomecp Cookie 获取失败", "", "请求头里没有 Cookie");
}
$done({});
