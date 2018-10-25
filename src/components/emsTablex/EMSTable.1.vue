<template>
  <div class="emstable-wrap">
    <div class="search-bar" v-if="slots['search-bar']">
      <div class="search-form" :class="{'expand': expandMore}">
        <slot name="search-bar"></slot>
      </div>
      <div class="handle-bar">
        <slot name="handle-bar"></slot>
        <div class="search-form-more" @click="expandMoreSearch">
          <a href="javascript:;">{{!expandMore ? "更多条件" : "隐藏条件"}}</a>
          <Icon type="chevron-down" v-if="!expandMore"></Icon>
          <Icon type="chevron-up" v-if="expandMore"></Icon>
        </div>
      </div>
    </div>
    <div class="single-table-con">

      <Table ref="table" border stripe :loading="loading" :highlight-row="highlightRow" :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" @on-current-change="onCurrentChange" @on-selection-change="selectionChange" @on-sort-change="sortHandle" @on-row-click="rowClickHandle" @on-expand="rowClickExpand" :class="{'rowclick': isRowclick, 'nodatas': !loading && !total}">
        <div slot="footer">
          <Row class="footer-tools">
            <Col :span="14" class="footer-tools-btns">
            <slot name="table-bar"></slot>
            </Col>
            <Col :span="10" class="footer-tools-pages">
            <Page :placement="placement" :total="total" :show-total="showTotal" :page-size-opts="pageSizeOpts" :page-size="param.page.pageSize" :current="param.page.currentPage" :show-sizer="showSizer" :show-elevator="showElevator" @on-change="changePage" @on-page-size-change="changePageSize" v-if="isPage">
              <span>共{{total}}条/每页{{param.page.pageSize}}条</span>
            </Page>
            </Col>
          </Row>

          <div class="ivu-table-nodata" v-if="!loading && !total">
            <Icon type="information-circled" />
            <span style="vertical-align: middle">暂无信息</span>
          </div>
        </div>
      </Table>
      <!-- <div style="margin: 10px;overflow: hidden" v-if="isPage">
                <div style="float: right;">
                    <Page 
                      :placement="placement" 
                      :total="total" 
                      :show-total="showTotal" 
                      :page-size-opts="pageSizeOpts" 
                      :show-sizer="showSizer" 
                      :page-size="param.page.pageSize" 
                      :current="param.page.currentPage" 
                      @on-change="changePage" 
                      @on-page-size-change="changePageSize"
                    >
                    </Page>
                </div>
            </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "EMSTable",
  components: {},
  props: {
    rowClickExpand: {
      type: Function
    },
    resource: {
      type: Array,
      default() {
        return [];
      }
    },
    useCatch: {
      type: Boolean,
      default() {
        return false;
      }
    },
    catchParams: {
      type: Object,
      default() {
        return {};
      }
    },
    highlightRow: {
      type: Boolean,
      default() {
        return false;
      }
    },
    action: {
      type: String,
      default() {
        return "";
      }
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    server: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    columnsFn: {
      type: Function
    },
    initParam: {
      type: Object,
      default() {
        return {};
      }
    },
    loadCallback: {
      type: Function,
      default() {
        return function(data) {};
      }
    },
    autoFirst: {
      type: Boolean,
      default() {
        return true;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    },
    showTotal: {
      type: Boolean,
      default() {
        return true;
      }
    },
    showSizer: {
      type: Boolean,
      default() {
        return true;
      }
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 150, 200, 300];
      }
    },
    isPage: {
      type: Boolean,
      default() {
        return true;
      }
    },
    onSelectionChange: {
      type: Function
    },
    rowClickHandle: {
      type: Function
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    // 行 为点击样式
    isRowclick: {
      type: Boolean,
      default: false
    },
    // 是否给行自动 加 序号
    isIndexAuto: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableData: [],
      tableColumns: [],
      total: 0,
      currentPage: 1,
      selection: [],
      loading: false,
      param: {
        page: {
          currentPage: 1,
          // pageNum: 0,
          pageSize: this.pageSize
        },
        params: this.params,
        sortDTO: {
          fieldName: "",
          orderBy: ""
        }
      },
      messageJob: undefined,
      isSelectionChange: false,
      currentRow: undefined,
      expandMore: false,
      slots: this.$slots
    };
  },
  computed: {
    placement() {
      let pageTotal = 0;
      if (this.total % this.pageSize == 0) {
        pageTotal = this.total / this.pageSize;
      } else {
        pageTotal = this.total / this.pageSize + 1;
      }
      pageTotal = parseInt(pageTotal);
      return this.total % this.pageSize < 3 && this.currentPage == pageTotal
        ? "bottom"
        : "top";
    },
    lang() {
      return $store.state.lang;
    }
  },
  created: function() {
    if (!!this.action && this.autoFirst) {
      this.load(this.initParam);
    } else if (!this.action) {
      this.loadLocal();
    }
    for (let c of this.columns) {
      if (!~"selection".indexOf(c.type)) {
        c.ellipsis = true;
      }
    }
    this.getColumns();
  },
  beforeMount: function() {},
  mounted: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
  methods: {
    onCurrentChange(currentRow, oldCurrentRow) {
      this.currentRow = Object.assign({}, currentRow);
    },
    getHighlightRow() {
      return this.currentRow;
    },
    getColumns() {
      if (typeof this.columnsFn == "function") {
        this.tableColumns = [].concat(this.columnsFn());
      } else {
        this.tableColumns = [].concat(this.columns);
      }

      // 加上序号列
      if (this.isIndexAuto) {
        this.tableColumns.unshift({
          title: "序号",
          align: "center",
          key: "INDEX_AUTO",
          width: 30
        });
      }
    },
    refresh() {
      this.param.page.currentPage = 1;
      this.$nextTick(() => {
        this.load();
      });
    },
    load(param = {}, page, cb = function() {}) {
      this.selection = [];
      for (let p in param) {
        this.param.params[p] = param[p];
      }
      this.loading = true;
      if (!!page && typeof page == "number") {
        this.param.page.currentPage = page;
      }
      this.param.page.recordCount = this.total;
      !!this.action ? this.loadAjax(cb) : this.loadLocal(cb);
    },
    loadLocal(cb) {
      this.loadCallback(this.resource);
      if (!this.isPage) {
        this.$nextTick(() => {
          this.tableData = [].concat(this.resource);
          this.loading = false;
        });
        return;
      }
      this.total = this.resource.length;
      let start = (this.param.page.currentPage - 1) * this.param.page.pageSize;
      let end = start + this.param.page.pageSize;
      end = this.resource.length > end ? end : this.resource.length;
      this.tableData = [];
      for (let i = start; i < end; i++) {
        this.tableData.push(this.resource[i]);
      }
      cb(this.tableData);
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    loadAjax(cb) {
      if (this.server[this.action]) {
        this.server[this.action](this.param).then(res => {
          this.loading = false;

          // 若返回的数据不符合要求
          if (!res || !res.data || res.data.pageNum === undefined) {
            return this.$Message.error((res && res.msg) || "数据加载失败");
          }

          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
          this.tableData = [];
          let _list = [];
          this.loadCallback(res.data.list);
          for (let item of res.data.list) {
            this.tableData.push(item);
          }
          cb(this.tableData);
        });
      } else {
        $store.dispatch(this.action, this.param).then(res => {
          this.loading = false;
          if (!res) return;
          this.currentPage = res.data.pageNum;
          this.total = res.data.total;
          this.tableData = [];
          let _list = [];
          this.loadCallback(res.data.list);
          for (let item of res.data.list) {
            this.tableData.push(item);
          }
          cb(this.tableData);
        });
      }
    },
    changePage(page) {
      this.param.page.currentPage = page;
      this.load();
    },
    changePageSize(page) {
      this.param.page.pageSize = page;
      this.load();
    },
    selectionChange(selection) {
      this.isSelectionChange = true;
      this.selection = selection;
      if (typeof this.onSelectionChange == "function") {
        this.onSelectionChange(selection);
      }
      this.$emit("on-selection-change", selection);
    },
    getSelectioned() {
      return this.isSelectionChange ? this.selection : undefined;
    },
    sortHandle(obj) {
      this.param.sortDTO.fieldName = obj.key;
      this.param.sortDTO.orderBy = obj.order;
      if (this.param.sortDTO.orderBy == "normal") {
        this.param.sortDTO = {
          fieldName: "",
          orderBy: ""
        };
      }
      this.refresh();
    },
    getSortData() {
      return this.param.sortDTO;
    },
    getTableObj() {
      return this.$refs["table"];
    },

    // 展开更多搜索选项
    expandMoreSearch() {
      this.expandMore = !this.expandMore;

      const pageSize = this.param.page.pageSize;
      if (pageSize > 10 && !this.expandMore) {
        // this.param.page.pageSize = 12
      } else {
        // this.param.page.pageSize = 10
      }
    },
    rowClickHandle(row, index) {
      console.log("row", row);
    },

    // 表格数据不够时用空白表格填满
    fill(list) {
      const pageSize = this.param.page.pageSize - 1;
      if (list.length < pageSize) {
        const len = pageSize - list.length;
        for (var i = 0; i <= len; i++) {
          this.tableData.push({ _disabled: true });
        }
      }
    },

    // 给空行添加样式
    rowClassName(row, index) {
      if (row._disabled) {
        return "disabled";
      } else {
        return "";
      }
    }
  },
  watch: {
    lang() {
      this.getColumns();
    },

    resource(newVal, oldVal) {
      this.resource = newVal;
    },

    tableData: {
      handler(newVal, oldVal) {
        // 填充序号
        if (this.isIndexAuto) {
          newVal.map((item, index) => {
            item.INDEX_AUTO = index + 1;
          });
        }

        // 填充空行
        this.fill(newVal);
      },
      immediate: true
    }
  },
  directives: {}
};
</script>
<style lang="less">
.emstable-wrap {
  background: #fff;
  border-top: 2px solid #ffa329;

  .search-bar {
    padding: 12px 22px 16px;
  }

  .handle-bar {
    position: relative;

    .ivu-btn {
      margin-right: 10px;
      padding-left: 10px;
      padding-right: 10px;
      height: 22px;
      line-height: 22px;
      padding: 0 10px 0 10px;
    }
  }

  .search-form {
    min-width: 1101px;
    height: 50px;
    overflow: hidden;
    margin-bottom: 10px;

    &.expand {
      min-width: 1101px;
      height: auto;
      overflow: inherit;
      margin-bottom: 5px;
    }

    &-more {
      color: #ffa329;
      position: absolute;
      right: 0;
      top: 2px;
      font-size: 13px;
    }

    .ivu-form-item {
      display: inline-block;
      margin-right: 0;
      vertical-align: top;
      margin-bottom: 5px;
      width: 20.6%;
    }

    .ivu-form-item:nth-child(5n + 5) {
      width: 16%;
      padding-right: 0;
    }

    .ivu-form-item-label {
      padding: 0;
    }

    .ivu-form-item-content {
      width: 180px;
      line-height: 26px;
    }

    .ivu-input,
    .ivu-select-selection,
    .ivu-input-number {
      border: 1px solid #ccc;
      border-radius: 0 !important;
      font-size: 12px;
      color: #333;
      height: 22px;
      line-height: 22px;
    }
  }

  .footer-tools {
    &-btns {
      min-height: 1px;
    }
  }

  .table-bar {
    padding: 0 0 10px 20px;

    .ivu-btn {
      margin-right: 10px;
    }
  }
}

.ivu-tabs {
  .emstable-wrap {
    border-top: none;
  }
}
</style>
