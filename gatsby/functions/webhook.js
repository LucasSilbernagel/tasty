// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

exports.handler = async () => {
  try {
    // Verify the webhook payload or perform any necessary validation

    // Trigger the redeployment of your Gatsby site
    const response = await axios.post(
      `https://api.netlify.com/build_hooks/${process.env.BUILD_HOOK_ID}`
    )

    // Handle the response from the build hook
    if (response.status === 200) {
      return {
        statusCode: 200,
        body: 'Redeployment triggered successfully',
      }
    } else {
      throw new Error('Failed to trigger redeployment')
    }
  } catch (error) {
    console.error('Error:', error.message)
    return {
      statusCode: 500,
      body: 'Error triggering redeployment',
    }
  }
}
