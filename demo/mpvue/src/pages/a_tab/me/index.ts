import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest } from '../../../utils';
import API from '../../../api';
import avantarImg from '../../../../static/images/avantar.png';

@Component({
    components: {
        item
    }
})
class Me extends Vue {
    isLogin: boolean = false;
    userInfo: any = {};
    mobile: string = '';
    avantar: any = avantarImg;

    onShow() {
        const _this = this;
        const token = wx.getStorageSync('token');
        this.isLogin = token ? true : false;
        if (this.isLogin) {
            this.mobile = wx.getStorageSync('mobile');
            wx.getUserInfo({
                lang: 'zh_CN',
                success: function (res: WX_UserInfo) {
                    _this.userInfo = res.userInfo;
                    _this.avantar = _this.userInfo.avatarUrl;
                }
            });
        } else {
            this.mobile = '登陆';
            this.avantar = avantarImg;
        }
    }

    gotoLogin() {
        if (!this.isLogin) {
            wx.navigateTo({
                url: '../../login/main'
            });
        }
    }

    // 收费标准 webview h5页面
    ghbLogisticFee(): void {
        wx.navigateTo({
            url: '../../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
        });
    }

    logout() {
        // console.log('退出');

        ghbRequest({
            url: API.LOGOUT,
            method: 'DELETE'
        }).then((res: GHB_Response<{}>) => {
            console.log(res);
            if (res.statusCode === 200) {
                wx.switchTab({
                    url: "../index/main"
                });
                wx.removeStorageSync('token');
                wx.removeStorageSync('mobile');
            } else {
                wx.showToast({
                    title: '操作失败'
                });
            }
        });
    }
}

export default Me
