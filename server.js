require('dotenv').config();
const { Client } = require ("@octoai/client");
const prompts = require('prompts');
const pdf = require ("pdf-parse")
const fs  = require ("fs/promises");
const path = require('path');
const { log } = require('console');
prompts.override(require('yargs').argv);

const client = new Client( process.env.OCTOAI_TOKEN);

(async ()=>{

    let models = await client.chat.listAllModels().map
    (model => {
        return {
            title: model,
            value: model
        }
    })

    const modelSelected = await prompts({
        type: "select",
        name: "model",
        message: "Which model would you like to choose?",
        choices: models,
        initial: 7,
    });

    console.log(modelSelected.model)

    const allFiles = await fs.readdir('./files')
    let pdfs = allFiles.filter(file => path.extname(file)
    .toLocaleLowerCase() === '.pdf');
    
    let choices = pdfs.map(pdf =>{
        return {
            title: pdf,
            value: pdf,
        }
    })

    let pdfSelected = await prompts([
        {
            type: 'select',
            name: 'pdf',
            message: "which pdf would like to choose?",
            choices: choices
        }
    ])

    console.log(pdfSelected.pdf);

    // const completion = await client.chat.completions.create({
    //     "model": modelSelected.model,
    //     "messages": [
    //         {
    //             "role": "system",
    //             "content": "Hello Iam friendly assistant! Ask me anything"
                
    //         },
    //         {
    //             "role": "user",
    //             "content": "What iis the Capital of kerala"
    //         }
    //     ]
    // });
    // console.log(completion);  
    // console.log('hi');
    // console.log(completion.choices[0].message.content);  
})
()