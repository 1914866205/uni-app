<template>
  <view>
    <template v-if="list.length > 0">
      <text>有内容</text>
      <block v-for="(item,index) in list" :key="index">
        <msg-list-item :item="item" :index="index"></msg-list-item>
      </block>
    </template>
    <template v-else>
      <no-thing></no-thing>
    </template>
  </view>
</template>

<script>
  const demo = [{
      avatar: '/static/default.jpg',
      username: '编程爱好者',
      update_time: 1603172125250,
      data: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      noread: '20'
    },
    {
      avatar: '/static/default.jpg',
      username: '编程爱好者',
      update_time: 1603172125250,
      data: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      noread: '20'
    },
    {
      avatar: '/static/default.jpg',
      username: '编程爱好者',
      update_time: 1602094660000,
      data: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      noread: '20'
    },
    {
      avatar: '/static/default.jpg',
      username: '编程爱好者',
      update_time: 1602294660000,
      data: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      noread: '20'
    }
  ];
  import noThing from '@/components/common/no-thing.vue';
  import msgListItem from '@/components/msg/msg-list-item.vue';
  export default {
    components: {
      noThing,
      msgListItem
    },
    data() {
      return {
        list: []
      };
    },
    onLoad() {
      this.list = demo;
    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
