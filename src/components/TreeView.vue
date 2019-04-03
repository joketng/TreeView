<template>
  <div>
    <ul class="distributionTree">
      <li v-for="(item,index) in data" :key="index">
        <div class="treeContent0" @click.stop.prevent="onItemClick(item, index, data)">
          <div class="tree-start" :style="{marginLeft:  parseInt(item.syscodesortlevel) * 15  +'px'}">
          <span class="nextSet"
                :class="{'nextSet_active':item.nextSetActive,
                'nextVisibility': item.haschild,
                'nextHidden' : !item.haschild}"
          ></span>
            <!--@click.prevent.stop="toggle(item, index)"-->
            <img class="img-header" :src="getImagePath(item)">

            <label>{{item.virtualname}}</label>

          </div>

          <div class="chose-icon" v-if="!item.haschild">
            <span v-if="assignType==='1'">
              <span class="checkbox" :class="{'checkbox_active':item.isSelected}"
              ></span>
            </span>
            <span v-else-if="assignType==='0'">
              <span class="radio" :class="{'radio_active':item.isSelected}"
              ></span>
              <!--@click.prevent.stop="radionToggle(item,data)"-->
            </span>
          </div>

        </div>
        <tree-view v-if="item.nextSetActive"
                   v-on="$listeners"
                   :data="item.itemChild"
                   :assignType="assignType"></tree-view>
      </li>
    </ul>
  </div>
</template>


<script>
  import imgLevelOne from '../assets/icon_institution_level_one.png'
  import imgLevelTwo from '../assets/icon_institution_level_two.png'
  import imgLevelThree from '../assets/headerImg.png'

  export default {
    name: "TreeView",
    data() {
      return {}
    },
    methods: {
      getImagePath(item) {
        let image = ""
        switch (item.syscodesortlevel) {
          case "1":
            image = imgLevelOne
            break
          default:
            if (!item.haschild) {
              image = imgLevelThree
            } else {
              image = imgLevelTwo
            }
            break
        }
        return image
      },
      onItemClick(item, index, data) {
        console.log("onItemClick")
        if (item.haschild) {
          item.nextSetActive = !item.nextSetActive;
          // let temItem = item
          // this.$set(data, index , temItem)
        } else {
          this.$emit('onItemClick', item, index, data, () => {
            console.log("itemClickCallBack")
          })
        }
        this.$forceUpdate()

      },

    },
    props: ["data", "assignType"]
  }
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  .distributionTree {
    width: 100%;
    box-sizing: border-box;
  }

  .treeContent0 {
    display: flex;
    margin-right: 20px;
    flex-flow: nowrap row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
    padding-top: 4px;
    padding-bottom: 4px;

  }

  .tree-start {
    display: flex;
    flex-flow: nowrap row;
    align-items: center;
  }

  .nextVisibility {
    visibility: visible;
  }

  .nextHidden {
    visibility: hidden;
  }

  .img-header {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .radio, .checkbox {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon_not_checked.png");
    background-size: cover;
  }

  .radio_active {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon_checked.png");
    background-size: cover;
  }

  .checkbox_active {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("../assets/icon_checked.png");
    background-size: cover;
  }


  /* 向右的箭头 */
  .nextSet {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url("../assets/icon_institution_right.png");
    background-size: cover;
  }

  .nextSet_active {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url("../assets/icon_institution_down.png");
    background-size: cover;
  }

</style>
