<template>
<div class="paynow-box">
  <div class="paynow-detail-box">
    <div class="amount-box">
      <div class="amount-title">付款金额</div>
      <div class="amount">￥{{ costs.amount || '--' }}</div>
    </div>
    <div class="amount-info-box">
      <div class="info-item">
        <div class="info-item-l"><span>里</span><span>程</span></div>
        <div class="info-item-r">{{ costs.dist || '0' }}km</div>
      </div>
      <div class="info-item">
        <div class="info-item-l">里程运费</div>
        <div class="info-item-r">￥{{ costs.zptFreight || '0.00' }}元</div>
      </div>
      <div class="info-item" v-if="costs.couponInfo && costs.couponInfo.id">
        <div class="info-item-l">{{ costs.couponInfo.name || '未知优惠券' }}</div>
        <div class="info-item-r color-notice">-￥{{ costs.couponInfo.priceValue }}元</div>
      </div>
      <div class="info-item">
        <div class="info-item-l">夜间服务</div>
        <div class="info-item-r">￥{{ costs.nightServiceFee || '0.00' }}元</div>
      </div>
      <div class="info-item">
        <div class="info-item-l">其他费用</div>
        <div class="info-item-r">￥0.00元</div>
      </div>
    </div>
  </div>
  <p class="paynow-tips">若涉及高速费、停车费和搬运费，需要用户额外向司机支付</p>
  <button class="ghb-btn paynow-btn" @click="payNow">确认订单并支付</button>
</div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

