<script>
document.addEventListener("DOMContentLoaded", function () {
  let toc = document.getElementById("TOC");
  let beforeToc = document.querySelector(".before-toc");
  if (toc && beforeToc) {
    toc.parentNode.insertBefore(beforeToc, toc);
  }
});
</script>
