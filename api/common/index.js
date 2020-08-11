import $axios from '@/utils/axios'

export const sendSms = (params) =>
  $axios.post('/api/common/sms/sendSms', params)

export const sendSms1 = (params) =>
  $axios.post('/api/common/sms/sendSms', params)
