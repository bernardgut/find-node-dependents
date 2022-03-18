#!/usr/bin/env node
const PackageDependents = require('package-dependents');
const info = require('package-info');

const packageName =  process.argv[2] ? process.argv[2] : process.exit();
const maxDepth = process.argv[3] ? process.argv[3] : 1; 

/* Store the dependents names and number */
const nameSet = new Set();
let counter = 0;
let depth = 0;

/* Get package dependents */
function getDependents (name, depth) {
  PackageDependents(name).then(packages => {
    if (depth >=maxDepth){
        return;
    }
    if (depth == 0) {
        console.log(`#\tDEPTH\tNAME\tDESCRIPTION`);
    }
    let localcounter = 0;
    let localSet = new Set();
    packages.forEach(async c => {
      /* If the name has not appear again increase the counter */
      if (!nameSet.has(c.name)){
        nameSet.add(c.name);
        localSet.add(c);
        let desc;
        try{
          desc = await info(c.name);
          console.log(`${localcounter}\t${depth}\t${c.name}\t${desc.description}`);
        }catch({message}){
          return next({
            status: 400,
            description: message
          });
        }
        counter++;
        localcounter++;
      }
    });
     
    localSet.forEach(c => {
        if (depth<maxDepth){
            getDependents(c.name, depth+1);
        }
    });
   
  })
}

/* Add original name to set */
nameSet.add(packageName);
getDependents(packageName, depth);

process.on('exit', () => {
    console.log("Package dependends:", counter);
});
