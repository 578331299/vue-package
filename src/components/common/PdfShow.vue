<template>
  <div class="iframe-container">
    <iframe frameborder="0" width="50%" height="500" :src="pdfSrc"></iframe>
  </div>
</template>
<script>
export default {
  name:"PdfShow",
  data() {
    return {
      pdfSrc: "pdf/web/viewer.html?file=compressed.tracemonkey-pldi-09.pdf"
    };
  }
};
</script>
<style scoped>
  .iframe-container{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

