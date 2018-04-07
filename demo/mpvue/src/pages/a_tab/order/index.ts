import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue';

@Component({
  components:{
    item
  }
})
class Order extends Vue {
  msg: string = '';

  created() {
    this.msg = '订单页面';
  }

  mounted() {}

  onShow() {
    // console.log('onshow');
  }
}

export default Order;