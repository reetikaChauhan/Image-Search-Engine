describe('Tests for the imagegeneration.spec.js',() =>{
    describe('Tests for formValidation',() =>{
        it('should return output false for string 78',() =>{
            const str = '78'
            const res = formValidation(str);
            expect(res).toEqual(false);
            
        });
    })
    // describe('Tests for handleimagegeneration method',() =>{
    //     it('should output a string API Fetch request failed calling without api key',() =>{
    //         const argument = 'Fruits'
    //         const api_key = ''
    //         const output = handleimagegeneration(argument,api_key)
    //         expect(output).toEqual('API Fetch request failed')
    //     })
    // })
    
});