export function goBackSetData(opts: any, pageLevel: number) {
  const options = opts || {};
  const pages = getCurrentPages(); // eslint-disable-line
  const prevPage = pages[pages.length - pageLevel];
  prevPage.setData(options);
}

export function goBackGetData() {
  const pages = getCurrentPages(); // eslint-disable-line
  const currPage = pages[pages.length - 1];
  return currPage.data;
}

export function getOtherPage(pageLevel: number = 1) {
  const pages = getCurrentPages(); // eslint-disable-line
  const targetPage = pages[pages.length - pageLevel];
  return targetPage;
}

export function isInputEmpty(value: string, title: string, icon: any = 'none') {
  if (!/\S/.test(value)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function isPhoneNumber(phone: string, title: string, icon: any = 'none') {
  if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(phone)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function showToastError(title: string = '网络繁忙，请稍后再试') {
  wx.showToast({
    title,
    icon: 'none'
  });
}

interface GhbRequest {
  url: string;
  method?: string;
  data?: any;
  header?: any;
}

export function ghbRequest(options: GhbRequest): Promise<any> {
  let isToastShowing: boolean = false;
  return new Promise((resolve: any, reject: any) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        authorization: wx.getStorageSync('token') || ''
      },
      success: function (res: any) {
        // console.log(res);
        if (res.statusCode === 401) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2500
          });
          wx.removeStorageSync('token');
          wx.removeStorageSync('mobile');
          isToastShowing = true;
        }
        resolve(res);
      },
      fail: function (err: any) {
        console.log(err);
        showToastError();
        reject('fail');
      },
      complete: function () {
        if (isToastShowing) return;
        wx.hideLoading();
        reject('complete');
      }
    });
  });
}

export function getDesText(des: string) {
  let retStr: string = '';
  if (des === 'start') {
    retStr = '发货';
  } else if (des === 'end') {
    retStr = '收货';
  }
  return retStr;
}

export function getOrderStatusText(data: any): string {

  let statusText: string = '';
  switch (data.status) {
    case -10:
      statusText = "已取消";
      break;
    case 10:
      // 立即支付
      statusText = "正在寻找司机";
      if (data.paymentType == 1) {
        if (data.paymentStatus == 0 || data.paymentStatus == 10) {
          statusText = "下单未支付";
        }
      } else {
        // 货到付款，支付保费
        if (data.paymentStatus == 0) {
          if (data.insuranceStatus == 1) {
            statusText = "未支付保费";
          }
        }
      }
      break;
    case 20:
      statusText = "已有司机接单";
      break;
    case 30:
      statusText = "正在装货";
      break;
    case 40:
      statusText = "运送中";
      break;
    case 50:
      statusText = data.paymentType == 2 ? '货已送达，对方未付款' : '已送达目的地';
      break;
    case 60:
      statusText = "已完成";
      break;
  }
  return statusText;
}

/**
 * 将 年-月-日 时:分:秒处理成格式：月-日 时:分 返回
 * 
 * @export
 * @param {string} sDate 年-月-日 时:分:秒
 * @returns 
 */
export function formatGhbGoodsRemarkDate(sDate: string) {
  if (sDate) {
    const aTime = sDate.split(' ');
    let rTime = '';
    if (aTime && aTime.length) {
      const sTimeMD = aTime[0];
      const sTimeHM = aTime[1];
      const aTimeMD = sTimeMD.split('-');
      const aTimeHM = sTimeHM.split(':');
      rTime = `${aTimeMD[1]}-${aTimeMD[2]} ${aTimeHM[0]}:${aTimeHM[1]}`;
      return rTime;
    } else {
      return sDate;
    }
  } else {
    return sDate;
  }
}


export function getCurrentPosition(url: string) {
  return new Promise((resolve, reject) => {
    // 小程序获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res: any) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 经纬度请求百度地图接口获取位置
        wx.request({
          url,
          data: {
            location: `${latitude},${longitude}`
          },
          success: function (res: any) {
            if (res.data && res.data.result) {
              const oResult = res.data.result;
              // 如果有 展示POI检索结果 ，优先选择这里面的
              if (oResult.pois && oResult.pois.length) {
                resolve(oResult.pois);
              } else {
                resolve([]);
              }
            }
          },
          fail: function () {
            reject({
              type: 'getPosition',
              msg: '百度获取具体位置失败'
            });
          }
        });
      },
      fail: function () {
        reject({
          type: 'getLocation',
          msg: '获取经纬度失败'
        });
      }
    });
  });
}

export function refreshToken(url: string) {
  return new Promise((resolve, reject) => {
    // 如果有 token ，先更新
    if (wx.getStorageSync('token')) {
      ghbRequest({
        url,
        data: {
          authorization: wx.getStorageSync('token') || ''
        }
      }).then((res: any) => {
        if (res.data && res.data.token) {
          wx.setStorageSync('token', res.data.token);
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}
