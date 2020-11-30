<template>
	<view>
		<h3>订单id: {{orderid}}</h3>
		<h3>订单总价: {{total}}</h3>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: '',
				orderid:''
			}
		},
		onLoad(options) {
			// if (options.total) {
			// 	this.total = options.total
			// 	console.log("订单总价: " + this.total)
			// }
			if (options.orderid) {
				this.orderid = options.orderid
				console.log("订单id: " + this.orderid)
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
