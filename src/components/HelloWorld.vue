<template>
  <div>
    <div class="wrap-institution-title">
      <span class="institution-title">{{choseSize}}</span>
    </div>
    <div class="institution-container">
      <tree-view v-if="listContent.length" :data="listContent" :assignType="choseType"
                 @onItemClick="onItemClick"></tree-view>
    </div>
  </div>
</template>

<script>
  import TreeView from "./TreeView";
  import jsonData from './institutional2.json'

  export default {
    name: 'HelloWorld',
    components: {TreeView},
    data() {
      return {
        listContent: [],
        choseType: "1",
        selectedList: []
      }
    },
    computed: {
      choseSize() {
        return `已选择${this.selectedList.length}个`
      }
    },
    created() {
      this._parseData(jsonData)

    },
    methods: {
      onItemClick(item, index, data, callBack) {
        console.log("parent click")
        if (this.choseType == "0") {
          this.clearDataChose(this.listContent)
        }
        item.isSelected = !item.isSelected
        // let temItem = item
        // this.$set(data, index, temItem)
        callBack()
        console.log(data)
        this.selectedList = []
        this.getDataChose(this.listContent)
      },
      _parseData(jsonData) {
        jsonData.forEach(item => {
          item.nextSetActive = false
          item.itemChild = []
          item.isSelected = false
        })
        console.log(jsonData)
        let levelOneList = jsonData.filter((item, index) => {
          return item.syscodesortlevel === "1"
        })
        this.listContent.addall(levelOneList)
        this.listContent.forEach((item0, index0) => {
          item0.itemChild.addall(jsonData.filter((item1, index1) => {
            return item1.syscodesortlevel === "2" && item1.orisyscode === item0.orisyscode
          }))
          item0.itemChild.forEach((item1, index1) => {
            item1.itemChild.addall(jsonData.filter((item2, index2) => {
              return item2.syscode.substring(0, 5) === item1.syscode.substring(0, 5) && item2.syscodesortlevel === "3" && item2.orisyscode === item1.orisyscode
            }))
          })
        })
        console.log(this.listContent)
        this.$forceUpdate()


        // jsonData.forEach(item=>{
        //   console.log(item)
        // })
      },
      clearDataChose(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].isSelected = false
          let item = data[i]
          this.$set(data, i, item)
          if (data[i].haschild) {
            this.clearDataChose(data[i].itemChild)
          }
        }
      },
      getDataChose(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].isSelected) {
            this.selectedList.push(data[i])
          }
          if (data[i].haschild) {
            this.getDataChose(data[i].itemChild)
          }
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap-institution-title {
    position: fixed;
    top: 64PX;
    width: 100%;
    background: #F4F1F2;
    height: 40PX;

  }
  .institution-title {
    display: block;
    width: 100%;
    height: 40PX;
    line-height: 40PX;
    text-align: center;
    color: #2297E7;
  }



  .institution-container {
    position: fixed;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    top: 104PX;
    bottom: 0;
  }

</style>
