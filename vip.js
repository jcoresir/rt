const KEY = "uhomecp_token";
const FILE = "uhomecp_token.txt";
const reg = /token|auth|session|sign|ticket/i;

const h = $request.headers || {};
const found = {};
for (const k in h) {
  if (reg.test(k)) found[k] = h[k];
}

if (Object.keys(found).length > 0) {
  const text = Object.keys(found).map((k) => k + ": " + found[k]).join("\n");
  $prefs.setValueForKey(text, KEY); // 先存一份保底

  let ok = false;
  try {
    if (typeof $iCloud !== "undefined" && $iCloud.writeFile) {
      ok = $iCloud.writeFile(text, FILE); // 写入即覆盖
    }
  } catch (e) {
    console.log("写文件出错: " + e);
  }

  $notify(
    ok ? "Token 已保存到 " + FILE : "Token 已获取,但文件写入失败",
    ok ? "位置:iCloud 云盘/Quantumult X" : "当前版本可能不支持 $iCloud,已存入数据存储",
    text
  );
} else {
  console.log("未找到 token 头:\n" + JSON.stringify(h, null, 2));
  $notify("uhomecp Token 获取失败", "", "请求头里没有匹配字段");
}

$done({});
