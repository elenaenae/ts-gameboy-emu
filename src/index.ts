import { CPURegisters } from "./cpu/registers/cpu-regs";

let registers: CPURegisters = new CPURegisters();

console.log(registers)

registers.A.value = 255;
console.log(registers.A.value);

registers.A.value += 2;
console.log(registers.A.value);

console.log(registers)

