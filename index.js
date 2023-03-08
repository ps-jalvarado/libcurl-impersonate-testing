process.env.LD_PRELOAD = '/usr/local/lib/libcurl.so';
process.env.CURL_IMPERSONATE = 'chrome110';
//process.env.CURL_IMPERSONATE_HEADERS = "no"; // use our own headers, or comment this line out to use curl-impersonate's default headers

const { curly } = require('node-libcurl');

async function start(){
    let sessionCurl = curly.create();

    response = await sessionCurl.get('https://tls.peet.ws/api/all');
    if (response.statusCode === 200) {
        let content = response.data;
        console.log(content);
    }
    await sleep(30000);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

start();