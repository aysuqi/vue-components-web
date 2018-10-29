<template>
  <div>
    <EMSTable :server="server" :resource="resourceData" ref="businessBigClassTable" action="QueryaccountControllerList" :params="accountControllerSearchForm" :columnsFn="accountControllerColumns" :highlight-row="true" :onSelectionChange="onSelectionChange">
      <Form :model="accountControllerSearchForm" ref="accountControllerSearchForm" :rules="rule" slot="search-bar" label-position="top" class="ivu-form-no-margin-bottom" inline>
        <Form-item prop="accountItemCode" label="会计科目编码">
          <Input type="text" maxlength="30" v-model="accountControllerSearchForm.accountItemCode" placeholder="会计科目编码"></Input>
        </Form-item>
        <Form-item prop="accountItemName" label="会计科目名称">
          <Input type="text" maxlength="30" v-model="accountControllerSearchForm.accountItemName" placeholder="会计科目名称"></Input>
        </Form-item>
        <Form-item prop="childAccountItemCode" label="子目编码">
          <Input type="text" maxlength="30" v-model="accountControllerSearchForm.childAccountItemCode" placeholder="子目编码"></Input>
        </Form-item>
        <Form-item prop="childAccountItemName" label="子目名称">
          <Input type="text" maxlength="30" v-model="accountControllerSearchForm.childAccountItemName" placeholder="子目名称"></Input>
        </Form-item>
        <Form-item prop="buCode" label="所属BU">
          <DataSelect class="" v-model="accountControllerSearchForm.buCode" code="BU" transfer @loadFinish="loadFinishVendorType"></DataSelect>
        </Form-item>
        <Form-item prop="valid" label="ERP有效性">
          <Select v-model="accountControllerSearchForm.valid" @on-change="setGroupName" transfer clearable>
            <Option v-for="(option, index) in isERPeffectiveness" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </Form-item>
        <Form-item prop="emsIsValidity" label="EMS有效性">
          <Select v-model="accountControllerSearchForm.emsIsValidity" @on-change="setGroupName" transfer clearable>
            <Option v-for="(option, index) in isEMSeffectiveness" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="handle-bar">
        <Button @click.native="search" type="warning" icon="search">查询</Button>
        <Button @click.native="reset" type="info" icon="loop">重置</Button>
      </div>
    </EMSTable>
  </div>
</template>
<script>
// import { EMSTable, DataSelect } from "ems-components";
import EMSTable from "../../components/emsTablex/EMSTable.vue";
import DataSelect from "../../components/dataSelect/DataSelect.vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import Server from "./server.js";
const server = new Server();
export default {
  // 会计科目管理
  components: { EMSTable, DataSelect },
  data() {
    return {
      resourceData: [],
      isShowBusiness: true,
      server: server,
      isERPeffectiveness: [],
      isEMSeffectiveness: [],
      accountControllerSearchForm: {
        accountItemCode: "",
        accountItemName: "",
        childAccountItemCode: "",
        childAccountItemName: "",
        buCode: "",
        valid: "",
        emsIsValidity: ""
      }
    };
  },
  computed: {},
  created: function() {
    this.isERPeffectiveness = [
      { label: "有效", value: "Y" },
      { label: "无效", value: "N" }
    ];
    this.isEMSeffectiveness = [
      { label: "有效", value: "Y" },
      { label: "无效", value: "N" }
    ];
    this.resourceData = [
      {
        accountId: 156288,
        accountItemCode: "1221210115",
        accountItemName:
          "其他应收款-集团存款-内部活期存款-应计利息-中间控股公司",
        accountLevel: "4",
        buCode: "B3000",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-29 17:23:34",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "A",
        updatedBy: "system",
        updatedTime: "2018-10-30 09:08:57",
        valid: "Y"
      },
      {
        accountId: 156974,
        accountItemCode: "6602100101",
        accountItemName: "管理费用-租赁费用",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:24:23",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "E",
        updatedBy: "system",
        updatedTime: "2018-10-04 09:10:45",
        valid: "Y"
      },
      {
        accountId: 159368,
        accountItemCode: "1901030101",
        accountItemName: "待处理财产损溢-待处理库存现金损溢",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:28:01",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "A",
        updatedBy: "system",
        updatedTime: "2018-10-03 17:51:03",
        valid: "Y"
      },
      {
        accountId: 157076,
        accountItemCode: "2211090101",
        accountItemName: "应付职工薪酬-辞退福利-因解除劳动关系给予的补偿",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:24:32",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "L",
        updatedBy: "system",
        updatedTime: "2018-10-04 09:11:06",
        valid: "Y"
      },
      {
        accountId: 158710,
        accountItemCode: "6401010309",
        accountItemName: "主营业务成本-商品成本-生产类-消费税",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:27:39",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "E",
        updatedBy: "system",
        updatedTime: "2018-10-03 18:53:42",
        valid: "Y"
      },
      {
        accountId: 158975,
        accountItemCode: "6602240601",
        accountItemName: "管理费用-行政收费-水土保持补偿费",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:27:47",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "E",
        updatedBy: "system",
        updatedTime: "2018-10-03 18:54:17",
        valid: "Y"
      },
      {
        accountId: 158946,
        accountItemCode: "6602010517",
        accountItemName: "管理费用-员工成本-福利费-职工活动经费",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:27:46",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "E",
        updatedBy: "system",
        updatedTime: "2018-10-03 18:54:13",
        valid: "Y"
      },
      {
        accountId: 156726,
        accountItemCode: "2502040201",
        accountItemName: "应付债券-融资券-利息调整-有抵押",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:24:09",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "L",
        updatedBy: "system",
        updatedTime: "2018-10-04 09:10:02",
        valid: "Y"
      },
      {
        accountId: 158094,
        accountItemCode: "2241260801",
        accountItemName: "其他应付款-集团往来-同系附属公司",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:27:23",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "L",
        updatedBy: "system",
        updatedTime: "2018-10-03 18:52:20",
        valid: "Y"
      },
      {
        accountId: 157488,
        accountItemCode: "1409990101",
        accountItemName: "房地产开发产品/待售物业-其他",
        accountLevel: "4",
        buCode: "B29",
        childAccountItemCode: "0",
        childAccountItemName: "",
        createdBy: "system",
        createdTime: "2018-10-03 17:27:07",
        emsIsValidity: "Y",
        isParentValue: "N",
        isPost: "Y",
        itemProperty: "A",
        updatedBy: "system",
        updatedTime: "2018-10-03 18:50:58",
        valid: "Y"
      }
    ];
  },
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    search(page) {
      this.$refs["businessBigClassTable"].load(
        this.accountControllerSearchForm,
        page
      );
      // console.log(JSON.stringify(this.accountControllerSearchForm));
    },
    reset() {
      this.$refs["accountControllerSearchForm"].resetFields();
      this.search(1);
    },
    accountControllerColumns() {
      return [
        {
          title: "所属BU编码",
          align: "center",
          key: "buCode  ",
          width: 150,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.buCode
                }
              },
              params.row.buCode
            );
          }
        },

        // {
        //   title: "所属BU名称",
        //   align: "center",
        //   key: "buName ",
        //   width: 140,
        //   render: (h, params) => {
        //     return h(
        //       "div",
        //       {
        //         attrs: {
        //           class: "ivu-table-cell ivu-table-cell-ellipsis",
        //           title: params.row.buName
        //         }
        //       },
        //       params.row.buName
        //     );
        //   }
        // },
        {
          title: "会计科目编码",
          align: "center",
          key: "accountItemCode ",
          width: 140,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountItemCode
                }
              },
              params.row.accountItemCode
            );
          }
        },

        {
          title: "会计科目名称",
          align: "center",
          key: "accountItemName ",
          minWidth: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountItemName
                }
              },
              params.row.accountItemName
            );
          }
        },

        {
          title: "子目编码",
          width: 160,
          align: "center",
          key: "childAccountItemCode ",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.childAccountItemCode
                }
              },
              params.row.childAccountItemCode
            );
          }
        },

        {
          title: "子目名称",
          align: "center",
          key: "childAccountItemName ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.childAccountItemName
                }
              },
              params.row.childAccountItemName
            );
          }
        },

        {
          title: "层级",
          align: "center",
          key: "accountLevel",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.accountLevel
                }
              },
              params.row.accountLevel
            );
          }
        },
        {
          title: "是否父级",
          align: "center",
          key: "isParentValue ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.isParentValue === "0" ? "否" : "是"
                }
              },
              params.row.isParentValue === "0" ? "否" : "是"
            );
          }
        },

        {
          title: "父级",
          align: "center",
          key: "parentCode ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.parentCode
                }
              },
              params.row.parentCode
            );
          }
        },
        {
          title: "科目属性",
          align: "center",
          key: "itemProperty ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.itemProperty
                }
              },
              params.row.itemProperty
            );
          }
        },
        {
          title: "有效日期起",
          align: "center",
          key: "effectiveDateStart ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.effectiveDateStart
                }
              },
              params.row.effectiveDateStart
            );
          }
        },
        {
          title: "有效日期止",
          align: "center",
          key: "effectiveDateEnd ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "ivu-table-cell ivu-table-cell-ellipsis",
                  title: params.row.effectiveDateEnd
                }
              },
              params.row.effectiveDateEnd
            );
          }
        },
        {
          title: "ERP有效性",
          align: "center",
          key: "valid ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.valid == "Y" ? "blue" : "red"
                }
              },
              params.row.valid == "Y" ? "有效" : "无效"
            );
          }
        },
        {
          title: "EMS有效性",
          align: "center",
          key: "emsIsValidity ",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: params.row.emsIsValidity == "Y" ? "blue" : "red"
                }
              },
              params.row.emsIsValidity == "Y" ? "有效" : "无效"
            );
          }
        }
      ];
    }
  },
  watch: {},
  directives: {}
};
</script>
