const assert = require("assert");
const request = require("request");




describe("Test to check login",()=>{





    it("tests normal signup",(done)=>{

        request.post({
            url:"http://localhost:3000",
            form:{name:"a",passwd:"a",confirm:"a"}
        },(err,response,body)=>{

            assert(response !== undefined && response.statusCode===200);
            done();
        });

    });






    it("tests normal login",(done)=>{
        request.post({
            url:"http://localhost:3000",
            form:{name:"a",passwd:"a"}
        },(err,response,body)=>{

            assert(response !== undefined && response.statusCode===200);
            done();
        });
    });

})
