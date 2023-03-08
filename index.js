process.env.LD_PRELOAD = '/usr/local/lib/libcurl.so';
process.env.CURL_IMPERSONATE = 'ff109';
process.env.CURL_IMPERSONATE_HEADERS = "yes";

const { curly } = require('node-libcurl');

async function start(){
    let sessionCurl = curly.create();

    response = await sessionCurl.get('https://tls.peet.ws/api/all');
    if (response.statusCode === 200) {
        let content = response.data;
        console.log(content);
    }
    await sleep(300000);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

start();