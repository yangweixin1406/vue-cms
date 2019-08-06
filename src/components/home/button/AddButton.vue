<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="addToCar"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../../lib/mui/dist/js/mui.min.js';
export default {
  data() {
    return {};
  },
  mounted () {
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
    addToCar () {
      this.$emit('getcount', parseInt(this.$refs.numbox.value));
    }
  },
  watch: {
    'max': function (newVal, oldVal) {
      mui(".mui-numbox").numbox().setOption('max',newVal);
    }
  },
  props: ['max']
};
</script>

<style lang="scss" scoped>
</style>

