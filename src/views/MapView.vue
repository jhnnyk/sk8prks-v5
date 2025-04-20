<template>
  <section class="section">
    <div class="iframe-rwd my-2">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1Ab_Dey4BRrhQSOPefnRJXD-lxHQcONg&ehbc=2E312F&noprof=1"
      ></iframe>
    </div>
  </section>
</template>

<style>
.iframe-rwd {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.iframe-rwd iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
