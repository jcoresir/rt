const v = $prefs.valueForKey("uhomecp_cookie") || "";

$done({
  status: "HTTP/1.1 200 OK",
  headers: { "Content-Type": "text/plain; charset=utf-8" },
  body: v,
});
