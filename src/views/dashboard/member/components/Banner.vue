<template>
  <div class="container">
    <div class="bg" />
    <div class="wrapper">
      <div class="content">
        <h1 class="title">{{ $t('banner.userTitle') }}</h1>
        <h2 class="sub-title" v-html="$t('banner.userSubTitle')" />
        <router-link :to="'/purchase/index'" class="button">
          <span>{{ $t('banner.purchase') }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 500px;
  align-items: center;
}

.wrapper {
  width: 80%;
  margin: auto;
  /* margin-top: 100px; */
}

.content {
  width: 752px;
  position: absolute;
  top: 11%;
}

.title {
  font-size: 3em;
  line-height: 68px;
}

.sub-title {
  font-size: 2.5em;
  line-height: 50px;
}

.bg {
  width: 100%;
  height: 100%;
  background-image: url('https://oras-myfile.s3-ap-southeast-1.amazonaws.com/1607937289712-final_bg.jpg') !important;;
  position: absolute;
  left: 0;
  top: 0;
  background-size: cover;
  background-position: 50%;
  transition: opacity .5s ease-out,transform .5s ease-out;
  /* transform: scale(1.1);
  opacity: 0; */
}

.button {
  display: inline-block;
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  white-space: nowrap;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  padding: 0 16px;
  transition: border .25s cubic-bezier(.785,.135,.15,.86), background-color .25s cubic-bezier(.785,.135,.15,.86), color .25s cubic-bezier(.785,.135,.15,.86);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
}
</style>
