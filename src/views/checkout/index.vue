<template>
  <div class="app-container">
    <div class="checkout-container">
      <div class="heading">
        <h1 style="font-weight: 500;">{{ $t('checkout.checkout') }}</h1>
        <p>{{ $t('checkout.select') }}</p>
      </div>
      <el-row :gutter="40">

        <el-col :span="14" :xs="24">
          <div>
            <h3 style="font-weight: 300;">{{ $t('checkout.method') }}</h3>
            <el-radio-group v-model="selectMethod">
              <span class="radio-button">
                <el-radio :label="1">
                  <span class="radio-label">
                    <span style="font-size: 16px;">PayPal</span>
                    <img src="https://s3.amazonaws.com/growth-prototypes/pp_cc_mark_111x69.jpg" alt="PayPal Icon" style="margin-left: 20px" width="74" height="20">
                  </span>
                </el-radio>
              </span>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="10" :xs="24">
          <el-card style="margin-bottom:20px; padding: 10px">
            <div slot="header" class="clearfix">
              <span style="font-weight: 500; font-size: 25px; color: #5D677A;">{{ $t('checkout.summary') }}</span>
            </div>

            <div class="checkout-detail">
              <div class="box-center">
                <table class="cart">
                  <tbody>
                    <tr>
                      <td class="item">{{ package_ && package_.name }} Package</td>
                      <td class="amount">{{ package_ && package_.currency | currencyFilter }} {{ package_ && package_.price | toThousandFilter }}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="total">
                  <tbody>
                    <tr>
                      <td class="title">{{ $t('checkout.total') }}</td>
                      <td class="total-amount">{{ package_ && package_.currency | currencyFilter }} {{ package_ && package_.price | toThousandFilter }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="legal-message">
                  {{ $t('checkout.policy') }}
                </div>
              </div>
            </div>

            <div class="">
              <div class="legal-message">
                <p v-html="$t('checkout.agree')" />
              </div>
              <el-button type="danger" :loading="btnLoading" class="proceed-btn" @click="proceedPaypal('v1/paypal/pay/' + (package_ && package_.price) + '?accountId=' + accountId + '&packageId=' + (package_ && package_.id))">{{ $t('checkout.complete') }}</el-button>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>

    <el-dialog :visible.sync="showDialog" width="33%">
      <span slot="title"><svg-icon class-name="size-icon" :icon-class="hasError ? 'failed' : 'success'" /> {{ dialogTitle }}</span>
      <p class="message" v-html="message" />
    </el-dialog>

  </div>
</template>

<script>
import { fetchPackage, checkValidAccount } from '@/api/package'

export default {
  name: 'Checkout',
  components: {},
  data() {
    return {
      package_: null,
      card: {
        name: '',
        number: '',
        expire: '',
        cvv: ''
      },
      activeTab: 'activity',
      selectMethod: 1,
      dialogTitle: '',
      message: '',
      showDialog: false,
      btnLoading: false,
      hasError: false,
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    accountId() {
      return this.$store.state.user.accId
    }
  },
  created() {
    this.packageId = this.$route.params && this.$route.params.id
    this.getCart(this.packageId)
  },
  methods: {
    getCart(id) {
      fetchPackage(id).then(response => {
        this.package_ = response.data
      })
    },
    proceedPaypal(link) {
      this.btnLoading = true
      checkValidAccount(link)
        .then(() => {
          window.open(this.baseURL + link, '_self')
        })
        .catch(err => {
          this.dialogTitle = 'Something went wrong!'
          this.hasError = true
          if (err.response.data.status === 406) {
            this.message = this.$t('checkout.useUp')
          } else {
            this.message = 'Network is unstable. Please check your connection.'
          }
          this.showDialog = true
          this.btnLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 30px;
}

.checkout-container {
  width: 1160px;
  margin: auto
}

.radio-button {
  display: inline-block;
  line-height: 1.43;
  position: relative;
  padding-left: 1.67em;
  padding-top: .07em;
  margin-bottom: 15px;
}

.checkout-detail {
  margin-bottom: 20px;
}

.cart {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #cacbcc;
  border-collapse: separate;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  text-align: initial;
  width: 100%;
  white-space: nowrap;
}

.cart {
  .item {
    line-height: 24px;
    vertical-align: middle;
    width: 100%;
  }

  .amount {
    min-width: 65px;
    padding-left: 10px;
    text-align: end;
  }
}
.cart {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #cacbcc;
  border-collapse: separate;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  text-align: initial;
  width: 100%;
  white-space: nowrap;
}

.total {
  .title {
    line-height: 24px;
    vertical-align: middle;
    width: 100%;
    font-weight: 700;
  }

  .total-amount {
    min-width: 65px;
    padding-left: 10px;
    text-align: end;
    font-weight: 700;
  }
}

.legal-message {
  font-size: 12px;
    line-height: 19px;
    margin-bottom: 8px;
}

.proceed-btn {
  font-weight: 600;
  font-size: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
}
</style>
