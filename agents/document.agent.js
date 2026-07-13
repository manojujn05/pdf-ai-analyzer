const analyzer =
require("../services/documentAnalyzer.service");

async function execute(file){

    return await analyzer.analyzePdf(file);

}

module.exports={
    execute
};