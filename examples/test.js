const { LibrusAPI } = require('../api');

async function main() {
  try {
    const librusApi = new LibrusAPI();
    const tokenCreated = await librusApi.mkToken('login_synergia', 'password_synergia');
    console.log('Token Created:', tokenCreated);
    if(tokenCreated){
      librusApi.getLessons()
      test = await librusApi.getAPI("SystemData")
      console.log(test)
      
      tmpGrades = await librusApi.getGrades();
      console.log(tmpGrades)
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
