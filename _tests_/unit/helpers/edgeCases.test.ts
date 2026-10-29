import helper from '../../../src/helpers/handleBoletosHelper';
test('the 2025 reset is explicit and timezone-independent',async()=>{const code='0'.repeat(33)+'1000'+'0'.repeat(10);expect(await helper.handleDueDate(code,'2025')).toBe('2025-02-22');expect(await helper.handleDueDate(code,'legacy')).toBe('2000-07-03');});
test('all ten amount digits are interpreted as cents',()=>{const code='0'.repeat(37)+'0001234567';expect(helper.handleFieldsBoleto(code).formattedAmount).toBe('12345.67');});
