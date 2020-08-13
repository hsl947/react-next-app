import Document, { DocumentContext } from 'next/document'
import cookies from 'next-cookies'

class MyDocument extends Document {
  /**
   * 在 App 中添加自定义的 getInitialProps 方法,
   * 将导致在没有 静态生成 的页面中禁用 自动静态优化,
   * 所以增加自定义 document 的 getInitialProps。
   * */
  static async getInitialProps(ctx: DocumentContext) {
    const getCookies = cookies(ctx)
    process.env.SN_TOKEN = getCookies.SN_token || ''
    // ctx.res.cookie('SN_token', 'asdasd1321fsf')
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }
}

export default MyDocument
