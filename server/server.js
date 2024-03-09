require('dotenv').config();
const { Client } = require ("@octoai/client");
const prompts = require('prompts');
const pdf = require ("pdf-parse")
const { PDFDocument } = require('pdf-lib');
const fs  = require ("fs/promises");
const path = require('path');
const { log } = require('console');
const { completion } = require('yargs');
prompts.override(require('yargs').argv);

const client = new Client( process.env.OCTOAI_TOKEN);

(async ()=>{

    // let models = await client.chat.listAllModels().map
    // (model => {
    //     return {
    //         title: model,
    //         value: model
    //     }
    // })

    // const modelSelected = await prompts({
    //     type: "select",
    //     name: "model",
    //     message: "Which model would you like to choose?",
    //     choices: models,
    //     initial: 6,
    // });

    // console.log(modelSelected.model)

    // const allFiles = await fs.readdir('./files')
    // let pdfs = allFiles.filter(file => path.extname(file)
    // .toLocaleLowerCase() === '.pdf');
    
    // let choices = pdfs.map(pdf =>{
    //     return {
    //         title: pdf,
    //         value: pdf,
    //     }
    // })

    // let pdfSelected = await prompts([
    //     {
    //         type: 'select',
    //         name: 'pdf',
    //         message: "which pdf would like to choose?",
    //         choices: choices,
    //         initial: 2
    //     }
    // ])

    // const dataBuffer = await fs.readFile(`files/${pdfSelected.pdf}`);
    // const { text } = await pdf(dataBuffer);
    // console.log(text);

    // const completion = await client.chat.completions.create({
    //     "model": modelSelected.model,
    //     "messages": [
    //         {
    //             "role": "system",
    //             "content": "Summarize the following PDF document in 3 Sentence"
                
    //         },
    //         {
    //             "role": "user",
    //             "content": "PDF content:\n" + text,
    //         }
    //     ]
    // });
    // // console.log("final result");
    // // console.log(completion);  
    // // console.log('/n');
    // // console.log(completion.choices[0].message.content);  
    
    // fs.writeFile(`./result/${pdfSelected.pdf}.txt`,
    // completion.choices[0].message.content,'utf-8');

    // console.log(`Summary written into file ${pdfSelected.pdf}.txt`);

    console.log('program run success fully');

})
()