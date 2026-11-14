const KEY = "uhomecp_cookie";
const FILE = "uhomecp_token.txt";

const h = $request.headers || {};
const cookie = h["Cookie"] || h["cookie"];

if (cookie) {
  $prefs.setValueForKey(cookie, KEY); // 保底存一份

  let ok = false;
  try {
    if (typeof $iCloud !== "undefined" && $iCloud.writeFile) {
      ok = $iCloud.writeFile(cookie, FILE); // 写入即覆盖
    }
  } catch (e) {
    console.log("写文件出错: " + e);
  }

  $notify(
    ok ? "Cookie 已保存到 " + FILE : "Cookie 已获取,但文件写入失败",
    ok ? "位置:iCloud 云盘/Quantumult X" : "已存入数据存储,键名 " + KEY,
    cookie
  );
} else {
  console.log("未找到 Cookie:\n" + JSON.stringify(h, null, 2));
  $notify("uhomecp Cookie 获取失败", "", "请求头里没有 Cookie");
}

$done({});
