import { ExtendedFlagRegister, FlagRegister, Register } from "./reg-def";

export class CPURegisters {
    A: Register;
    B: Register;
    C: Register;
    D: Register;
    E: Register;
    F: Register;
    L: Register;
    H: Register;

    AF: Register;
    BC: Register;
    DE: Register;
    HL: Register;

    SP: Register;
    PC: Register;

    regArray: ArrayBuffer;
    
    constructor() {
        this.regArray = new ArrayBuffer(12);
        this.F = new FlagRegister('F', 0, this.regArray);
        this.A = new Register('A', 1, this.regArray, 1);
        this.C = new Register('C', 2, this.regArray);
        this.B = new Register('B', 3, this.regArray);
        this.E = new Register('E', 4, this.regArray);
        this.D = new Register('D', 5, this.regArray);
        this.L = new Register('L', 6, this.regArray);
        this.H = new Register('H', 7, this.regArray);

        this.AF = new ExtendedFlagRegister('AF', 0, this.regArray, 2);
        this.BC = new Register('BC', 2, this.regArray, 2);
        this.DE = new Register('DE', 4, this.regArray, 2);
        this.HL = new Register('HL', 6, this.regArray, 2);

        this.SP = new Register('SP', 8, this.regArray, 2);
        this.PC = new Register('PC', 10, this.regArray, 2);
    }

}