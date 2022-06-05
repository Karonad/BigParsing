const fs = require('fs');

const stream = fs.createReadStream('./assets/input.json', { encoding: 'utf8', highWaterMark: 20 });
const argId = process.argv[2];
let previousChunk = '';


const extractNameFromString = (nameIndex, string) => {
  // space beetwen name and ":"
  const startOfTheName = nameIndex + 8;
  const endOfTheName = string.indexOf('\"', startOfTheName);

  if(endOfTheName === -1) return false;
  return string.substring(startOfTheName, endOfTheName)
}




const  readStream = async (id) => {
  for await (const chunk of stream) {
      const stringedObject = chunk.toString();
      const stringLocation =  previousChunk.indexOf(id);

      previousChunk += stringedObject;
      if (stringLocation !== -1) { 
        const namePosition = previousChunk.indexOf("name", stringLocation + id.length);
        const name = extractNameFromString(namePosition, previousChunk);

        if(name === false) continue;
        console.log(name)
        break;
      } 
      previousChunk = stringedObject;
  }
}

readStream(argId)