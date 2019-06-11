<template>
<div  :style="{left:styleDiv.left,position:styleDiv.position,bottom:styleDiv.bottom}" style="width:calc(100% - 68px)">
  <table>
       <tr>
           <td>N1</td>
           <td>N2</td>
           <td>N3</td>
           <td>M2</td>
           <td>M3</td>
       </tr>
       <tr v-for="item in tableData" :key="item.index">
           <td>{{item.n1}}</td>
           <td>{{item.n2}}</td>
           <td>{{item.n3}}</td>
           <td>{{item.m1}}</td>
           <td>{{item.m2}}</td>
       </tr>
   </table>
</div>
</template>

<script>
  export default {
    name:"vTable",
    data() {
      return {
        
      }
    },
    props:{
       styleDiv:Object,
       tableData:Array
    }
  }
</script>
<style scoped>
table{
    width: 100%;
    border-collapse:collapse;
    text-align: center;
    font-size: 12px;
    background: #fff;
}
td{
    border: 1px solid #ebeef5;
   
}
</style>
