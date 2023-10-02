const { LibrusAPI } = require('../api');

async function main() {
  try {
    const librusApi = new LibrusAPI();
    const tokenCreated = await librusApi.mkToken('synergia_login', 'synergia_password');
    console.log('Token Created:', tokenCreated);
    if(tokenCreated){
      librusApi.getLessons()
      librusApi.getAPI("SystemData")
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
