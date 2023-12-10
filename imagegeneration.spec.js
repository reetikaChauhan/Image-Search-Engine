describe('Form', () => {
    describe('formValidation', () => {
      it('should return true for valid input', () => {
        const validInput = 'ValidInput';
        const result = Form.formValidation(validInput);
        expect(result).toBe(true);
      });
  
      it('should return false for input containing numbers', () => {
        const inputWithNumbers = 'InvalidInput123';
        const result = Form.formValidation(inputWithNumbers);
        expect(result).toBe(false);
      
      });
  
      it('should return false for input containing special characters', () => {
        const inputWithSpecialChars = 'InvalidInput!@#';
        const result = Form.formValidation(inputWithSpecialChars);
        expect(result).toBe(false);
      });
  
      
    });

  });
 