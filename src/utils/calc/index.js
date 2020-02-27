export function timeDiff(postTime) {
  let time = "";

  const diffMs = Date.now() - new Date(postTime);

  const diffS = Math.round(diffMs / 1000);
  if (diffS < 60) {
    time = diffS + "秒前";
    return time;
  }

  const diffM = Math.round(diffS / 60);
  if (diffM < 60) {
    time = diffM + "分钟前";
    return time;
  }

  const diffH = Math.round(diffM / 60);
  if (diffH < 24) {
    time = diffM + "小时前";
    return time;
  }

  const diffD = Math.round(diffH / 24);
  if (diffD < 30) {
    time = diffD + "天前";
    return time;
  }

  const diffMonth = Math.round(diffD / 30);
  if (diffMonth < 12) {
    time = diffMonth + "个月前";
    return time;
  }

  const diffY = Math.round(diffMonth / 12);
  time = diffY + "年前";
  return time;
}
