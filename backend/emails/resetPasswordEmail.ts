const emailText = {
  header: 'Forgot your password?',
  text: `No worries, it happens! Click the link below to reset your password. If you didn't make this request, please disregard this email and the link will expire in 24 hours.`,
  button: 'Reset your password',
  siteName: 'GeoHub',
  siteUrl: 'https://www.geohub.gg',
}

const resetPasswordEmail = (resetUrl: string) => {
  return `
  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width: 670px;  margin: 0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height: 80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                      <a href=${emailText.siteUrl} style="color: #0e0e0e; font-size: 20px; text-decoration: none;">
                      ${emailText.siteName}
                      </a>
                    </td>
                </tr>
                <tr>
                    <td style="height: 20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width: 670px; background: #fff; border-radius: 3px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0,0,0,.06); -moz-box-shadow: 0 6px 18px 0 rgba(0,0,0,.06); box-shadow: 0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height: 40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color: #1e1e2d; font-weight: 500; margin: 0; font-size: 24px; font-family:'Rubik', sans-serif;">${emailText.header}</h1>
                                    <span
                                        style="display: inline-block; vertical-align: middle; margin: 29px 0 26px; border-bottom: 1px solid #cecece; width: 100px;"></span>
                                    <p style="color: #455056; font-size: 15px; line-height: 24px; margin: 0;">${emailText.text}</p>
                                    <a href=${resetUrl} style="display: inline-block; background-color: #4338ca; color: #fff; font-size: 16px; text-decoration: none; border-radius: 5px; padding: 12px 18px; margin-top: 16px;">${emailText.button}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                <tr>
                    <td style="height: 80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
  </table>
`
}

export default resetPasswordEmail
