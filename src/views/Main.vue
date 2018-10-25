<template>
    <div class="wrapper-container">
        <Row>
            <Col span="4" class="wrapper-navigate">
            <div class="navigate">
                <Menu theme="light" active-name="1" width="auto">
                    <MenuGroup title="组件">
                        <MenuItem name="1">
                        <router-link :to="{ path: 'data-select-test'}">DataSelect下拉选择组件</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                        <router-link :to="{ path: 'business-type-tree'}">tree组件</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                        <router-link :to="{ path: 'select-business-type'}">弹出框选择组件</router-link>
                        </MenuItem>
                        <MenuItem name="4">
                        <router-link :to="{ path: 'pay-way-info'}">转账、票据、其它付款信息组件</router-link>
                        </MenuItem>
                        <MenuItem name="5">
                        <router-link :to="{ path: 'edite-vendor-info'}">编辑供应商信息</router-link>
                        </MenuItem>
                        <MenuItem name="6">
                        <router-link :to="{ path: 'select-city'}">选择城市</router-link>
                        </MenuItem>
                        <MenuItem name="7">
                        <router-link :to="{ path: 'select-vendor'}">选择个人/供应商</router-link>
                        </MenuItem>
                        <MenuItem name="8">
                        <router-link :to="{ path: 'select-vendor-bank-info'}">选择供应商银行账号</router-link>
                        </MenuItem>
                        <MenuItem name="9">
                        <router-link :to="{ path: 'select-company'}">选择归属公司</router-link>
                        </MenuItem>
                        <MenuItem name="10">
                        <router-link :to="{ path: 'v-table'}">功能强大的v-table</router-link>
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </div>
            </Col>
            <Col span="20">
            <div class="wrapper-content ivu-article" style="height:100%">
                <article>
                    <router-view></router-view>
                </article>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // if (!sessionStorage.crctoken) {
    //   this.$Modal.info({
    //     title: "温馨提示",
    //     content: "<p>请先登录，然后再测试组件！</p>"
    //   });
    // }
  }
};
</script>

<style>
.wrapper-container {
  margin-top: 15px;
  height: inherit;
}
</style>
